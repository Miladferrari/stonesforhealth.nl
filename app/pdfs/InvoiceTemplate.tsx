import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#492c4a',
  },
  logo: {
    width: 120,
    height: 40,
  },
  companyInfo: {
    textAlign: 'right',
    fontSize: 9,
    color: '#666666',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#492c4a',
    marginBottom: 5,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#492c4a',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  addressBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addressColumn: {
    width: '48%',
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    color: '#2D2D2D',
  },
  textBold: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#2D2D2D',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#492c4a',
    padding: 8,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  tableCol1: {
    width: '50%',
  },
  tableCol2: {
    width: '15%',
    textAlign: 'center',
  },
  tableCol3: {
    width: '17.5%',
    textAlign: 'right',
  },
  tableCol4: {
    width: '17.5%',
    textAlign: 'right',
  },
  totalsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: '70%',
    textAlign: 'right',
    fontSize: 10,
    color: '#2D2D2D',
    paddingRight: 10,
  },
  totalValue: {
    width: '17.5%',
    textAlign: 'right',
    fontSize: 10,
    color: '#2D2D2D',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#492c4a',
  },
  grandTotalLabel: {
    width: '70%',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#492c4a',
    paddingRight: 10,
  },
  grandTotalValue: {
    width: '17.5%',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#492c4a',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  paymentInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  notesSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fef3c7',
    borderRadius: 4,
  },
});

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  invoiceDate: string;
  orderDate: string;
  dueDate?: string;

  // Company info
  companyName: string;
  companyAddress: string;
  companyPostcode: string;
  companyCity: string;
  companyCountry: string;
  companyEmail: string;
  companyPhone: string;
  companyVAT?: string;
  companyKVK?: string;
  companyIBAN?: string;

  // Customer billing info
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  billingAddress: string;
  billingPostcode: string;
  billingCity: string;
  billingCountry: string;

  // Customer shipping info
  shippingName: string;
  shippingAddress: string;
  shippingPostcode: string;
  shippingCity: string;
  shippingCountry: string;

  // Order items
  items: InvoiceItem[];

  // Pricing
  subtotal: number;
  discount?: number;
  discountCode?: string;
  shippingCost: number;
  shippingMethod: string;
  tax?: number;
  total: number;

  // Payment info
  paymentMethod: string;
  paymentStatus: string;

  // Notes
  customerNotes?: string;
}

interface InvoiceTemplateProps {
  data: InvoiceData;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>{data.companyName}</Text>
            <Text style={styles.text}>{data.companyAddress}</Text>
            <Text style={styles.text}>{data.companyPostcode} {data.companyCity}</Text>
            <Text style={styles.text}>{data.companyCountry}</Text>
            <Text style={styles.text}>{data.companyEmail}</Text>
            <Text style={styles.text}>{data.companyPhone}</Text>
            {data.companyKVK && <Text style={styles.text}>KVK: {data.companyKVK}</Text>}
            {data.companyVAT && <Text style={styles.text}>BTW: {data.companyVAT}</Text>}
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.invoiceTitle}>FACTUUR</Text>
            <Text style={styles.textBold}>Factuurnummer: {data.invoiceNumber}</Text>
            <Text style={styles.text}>Bestelnummer: {data.orderNumber}</Text>
            <Text style={styles.text}>Factuurdatum: {data.invoiceDate}</Text>
            <Text style={styles.text}>Besteldatum: {data.orderDate}</Text>
            {data.dueDate && <Text style={styles.text}>Vervaldatum: {data.dueDate}</Text>}
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.addressBlock}>
          {/* Billing Address */}
          <View style={styles.addressColumn}>
            <Text style={styles.sectionTitle}>Factuuradres</Text>
            <Text style={styles.textBold}>{data.customerName}</Text>
            <Text style={styles.text}>{data.billingAddress}</Text>
            <Text style={styles.text}>{data.billingPostcode} {data.billingCity}</Text>
            <Text style={styles.text}>{data.billingCountry}</Text>
            <Text style={styles.text}>{data.customerEmail}</Text>
            {data.customerPhone && <Text style={styles.text}>{data.customerPhone}</Text>}
          </View>

          {/* Shipping Address */}
          <View style={styles.addressColumn}>
            <Text style={styles.sectionTitle}>Verzendadres</Text>
            <Text style={styles.textBold}>{data.shippingName}</Text>
            <Text style={styles.text}>{data.shippingAddress}</Text>
            <Text style={styles.text}>{data.shippingPostcode} {data.shippingCity}</Text>
            <Text style={styles.text}>{data.shippingCountry}</Text>
          </View>
        </View>

        {/* Order Items Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bestelde Producten</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableCol1}>Product</Text>
              <Text style={styles.tableCol2}>Aantal</Text>
              <Text style={styles.tableCol3}>Prijs</Text>
              <Text style={styles.tableCol4}>Totaal</Text>
            </View>

            {/* Table Rows */}
            {data.items.map((item, index) => (
              <View
                key={index}
                style={
                  index % 2 === 1
                    ? [styles.tableRow, styles.tableRowEven]
                    : styles.tableRow
                }
              >
                <Text style={styles.tableCol1}>{item.name}</Text>
                <Text style={styles.tableCol2}>{item.quantity}</Text>
                <Text style={styles.tableCol3}>{formatCurrency(item.price)}</Text>
                <Text style={styles.tableCol4}>{formatCurrency(item.total)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotaal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(data.subtotal)}</Text>
          </View>

          {data.discount && data.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Korting {data.discountCode ? `(${data.discountCode})` : ''}:
              </Text>
              <Text style={styles.totalValue}>-{formatCurrency(data.discount)}</Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Verzendkosten ({data.shippingMethod}):
            </Text>
            <Text style={styles.totalValue}>
              {data.shippingCost > 0 ? formatCurrency(data.shippingCost) : 'GRATIS'}
            </Text>
          </View>

          {data.tax && data.tax > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>BTW (21%):</Text>
              <Text style={styles.totalValue}>{formatCurrency(data.tax)}</Text>
            </View>
          )}

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>TOTAAL:</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(data.total)}</Text>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentInfo}>
          <Text style={styles.textBold}>Betaalinformatie</Text>
          <Text style={styles.text}>Betaalmethode: {data.paymentMethod}</Text>
          <Text style={styles.text}>Status: {data.paymentStatus}</Text>
          {data.companyIBAN && (
            <Text style={styles.text}>IBAN: {data.companyIBAN}</Text>
          )}
        </View>

        {/* Customer Notes */}
        {data.customerNotes && (
          <View style={styles.notesSection}>
            <Text style={styles.textBold}>Opmerkingen:</Text>
            <Text style={styles.text}>{data.customerNotes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Bedankt voor uw bestelling bij {data.companyName}!</Text>
          <Text>
            Voor vragen kunt u contact met ons opnemen via {data.companyEmail} of {data.companyPhone}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Deze factuur is automatisch gegenereerd en geldig zonder handtekening.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;
