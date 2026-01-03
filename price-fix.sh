#!/bin/bash
# Update prices in admin.html
sed -i '' "s/'Hair Cutting': 'CMR 500.00'/'Hair Cutting': 'OMR 10.000'/g" admin.html
sed -i '' "s/'Hair Styling': 'CMR 400.00'/'Hair Styling': 'OMR 8.000'/g" admin.html
sed -i '' "s/'Hair Coloring': 'CMR 600.00'/'Hair Coloring': 'OMR 12.000'/g" admin.html
sed -i '' "s/'Hair Treatment': 'CMR 550.00'/'Hair Treatment': 'OMR 11.000'/g" admin.html
sed -i '' "s/'Hair Blowout': 'CMR 350.00'/'Hair Blowout': 'OMR 7.000'/g" admin.html
sed -i '' "s/'Manicure': 'CMR 300.00'/'Manicure': 'OMR 6.000'/g" admin.html
sed -i '' "s/'Pedicure': 'CMR 350.00'/'Pedicure': 'OMR 7.000'/g" admin.html
sed -i '' "s/'Nail Polish': 'CMR 150.00'/'Nail Polish': 'OMR 3.000'/g" admin.html
sed -i '' "s/'Basic Makeup': 'CMR 400.00'/'Basic Makeup': 'OMR 8.000'/g" admin.html
sed -i '' "s/'Event Makeup': 'CMR 700.00'/'Event Makeup': 'OMR 14.000'/g" admin.html
sed -i '' "s/'Facial Cleansing': 'CMR 450.00'/'Facial Cleansing': 'OMR 9.000'/g" admin.html
sed -i '' "s/'Face Masks': 'CMR 350.00'/'Face Masks': 'OMR 7.000'/g" admin.html
sed -i '' "s/'Waxing': 'CMR 250.00'/'Waxing': 'OMR 5.000'/g" admin.html
sed -i '' "s/'Sugar Wax': 'CMR 300.00'/'Sugar Wax': 'OMR 6.000'/g" admin.html
