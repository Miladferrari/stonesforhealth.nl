'use client';

import React from 'react';
import { Product, ProductVariation } from '@/lib/woocommerce';

interface VariationSelectorProps {
  product: Product;
  variations: ProductVariation[];
  selectedVariation: ProductVariation | null;
  onVariationChange: (variation: ProductVariation | null) => void;
}

export default function VariationSelector({
  product,
  variations,
  selectedVariation,
  onVariationChange,
}: VariationSelectorProps) {
  // Extract unique attribute names that are used for variations
  const variationAttributes = product.attributes?.filter(attr => attr.variation) || [];

  // State to track selected options for each attribute
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>({});

  // Initialize selected options from selectedVariation if provided
  React.useEffect(() => {
    if (selectedVariation) {
      const options: Record<string, string> = {};
      selectedVariation.attributes.forEach(attr => {
        options[attr.name] = attr.option;
      });
      setSelectedOptions(options);
    }
  }, [selectedVariation]);

  // Find matching variation based on selected options
  const findMatchingVariation = (options: Record<string, string>): ProductVariation | null => {
    // Check if all attributes are selected
    const allSelected = variationAttributes.every(attr => options[attr.name]);
    if (!allSelected) return null;

    // Find variation that matches all selected options
    return variations.find(variation => {
      return variation.attributes.every(attr => {
        return options[attr.name] === attr.option;
      });
    }) || null;
  };

  // Handle option selection
  const handleOptionChange = (attributeName: string, option: string) => {
    const newOptions = {
      ...selectedOptions,
      [attributeName]: option,
    };
    setSelectedOptions(newOptions);

    // Find and select matching variation
    const matchingVariation = findMatchingVariation(newOptions);
    onVariationChange(matchingVariation);
  };

  // Get available options for an attribute (considering stock)
  const getAvailableOptions = (attributeName: string) => {
    const attribute = variationAttributes.find(attr => attr.name === attributeName);
    if (!attribute) return [];

    // Get all options for this attribute
    return attribute.options.map(option => {
      // Check if this option is available (has at least one in-stock variation)
      const hasAvailableVariation = variations.some(variation => {
        const attrMatch = variation.attributes.find(a => a.name === attributeName);
        return attrMatch?.option === option && variation.stock_status === 'instock';
      });

      return {
        value: option,
        available: hasAvailableVariation,
      };
    });
  };

  if (variationAttributes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {variationAttributes.map((attribute) => {
        const options = getAvailableOptions(attribute.name);
        const selectedOption = selectedOptions[attribute.name];

        return (
          <div key={attribute.id} className="space-y-2">
            <label className="block text-base font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">
              {attribute.name}
            </label>
            <div className="space-y-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="kaching-bundles__bar-wrapper"
                >
                  <div
                    role="button"
                    tabIndex={option.available ? 0 : -1}
                    className={`kaching-bundles__bar-main relative block p-4 border rounded-lg transition-all ${
                      !option.available
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                        : selectedOption === option.value
                        ? 'border-black bg-white cursor-pointer'
                        : 'border-gray-300 hover:border-gray-400 bg-white cursor-pointer'
                    }`}
                    onClick={() => option.available && handleOptionChange(attribute.name, option.value)}
                  >
                    <div className="kaching-bundles__bar-content flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`kaching-bundles__bar-radio w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === option.value
                              ? 'border-black bg-black'
                              : 'border-gray-400 bg-white'
                          }`}
                        >
                          {selectedOption === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="kaching-bundles__bar-content-left">
                          <span className="kaching-bundles__bar-title text-base md:text-lg font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">
                            {option.value}
                          </span>
                          {!option.available && (
                            <span className="text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                              {' '}(Niet op voorraad)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
