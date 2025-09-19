# DNS Propagatie Fix Guide

## Probleem
De domeinverhuizing van stonesforhealth.nl is nog niet volledig doorgevoerd. DNS propagatie kan 24-48 uur duren.

## Huidige Status

### ✅ Nieuwe DNS Records (correct):
- `stonesforhealth.nl` → 216.198.79.1 (Vercel)
- `wordpress.stonesforhealth.nl` → 161.35.146.94 (DigitalOcean WordPress)

### ❌ Oude DNS Cache (bij sommige ISPs):
- Beide domeinen → 195.242.98.98 (oude Plesk/PrestaShop server)

## Directe Oplossingen

### 1. Flush DNS Cache op je computer:
**macOS:**
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Windows:**
```cmd
ipconfig /flushdns
```

### 2. Tijdelijke hosts file aanpassing (voor ontwikkeling):
Voeg toe aan `/etc/hosts` (macOS/Linux) of `C:\Windows\System32\drivers\etc\hosts` (Windows):
```
161.35.146.94 wordpress.stonesforhealth.nl
216.198.79.1 stonesforhealth.nl
```

### 3. Test met andere DNS servers:
Stel je DNS in op:
- Google DNS: 8.8.8.8 / 8.8.4.4
- Cloudflare: 1.1.1.1 / 1.0.0.1

## Verificatie Stappen

### Check huidige DNS resolutie:
```bash
nslookup stonesforhealth.nl 8.8.8.8
nslookup wordpress.stonesforhealth.nl 8.8.8.8
```

### Test WordPress API direct:
```bash
curl -I http://161.35.146.94/wp-json/wc/v3/products
```

## Permanente Oplossing

### Bij de oude domein eigenaar:
1. Zorg dat alle DNS records bij de oude provider zijn verwijderd
2. Check of de domeinverhuizing volledig is afgerond
3. Wacht op volledige DNS propagatie (24-48 uur)

### Bij Hostnet (nieuwe provider):
Verifieer dat deze DNS records correct zijn:
- A record: stonesforhealth.nl → 216.198.79.1
- A record: www.stonesforhealth.nl → 216.198.79.1
- A record: wordpress.stonesforhealth.nl → 161.35.146.94

### SSL Certificaat voor WordPress:
WordPress forceert HTTPS maar het SSL certificaat is nog niet correct geconfigureerd.
In DigitalOcean:
1. Installeer Let's Encrypt SSL voor wordpress.stonesforhealth.nl
2. Of gebruik Cloudflare voor SSL

## Monitoring
Check DNS propagatie wereldwijd:
- https://dnschecker.org/#A/stonesforhealth.nl
- https://whatsmydns.net/#A/wordpress.stonesforhealth.nl

## Tijdelijke .env.local configuratie
Als workaround kun je tijdelijk het directe IP gebruiken:
```
NEXT_PUBLIC_WOOCOMMERCE_URL=http://161.35.146.94/wp-json/wc/v3
```

Let op: Dit werkt alleen als je de Host header correct stuurt.