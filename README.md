# LoadMail Chrome Extension

A powerful Chrome extension that enhances the [one.dat.com](https://one.dat.com) load board website with advanced features including interactive maps, rate calculators, and streamlined email communication.

## 🚀 Features

### 🗺️ Interactive Route Maps
- **Real-time Route Visualization**: Displays interactive Leaflet maps showing driver → pickup → dropoff routes
- **Accurate Distance Calculation**: Calculates actual road distances (not straight-line) for:
  - **Total Distance**: Complete route from driver to dropoff
  - **Trip Distance**: Pickup to dropoff distance
  - **Deadhead (DH) Distance**: Driver to pickup distance
- **Automatic DH Sync**: Deadhead distance from map automatically updates the rate calculator
- **Route Information Popup**: Shows distance breakdown and estimated travel time at route midpoint

### 💰 Dynamic Rate Calculator
- **Load-Specific Calculations**: Automatically populates with actual load data (miles, rate)
- **Real-time Updates**: All calculations update instantly when values change
- **Comprehensive Metrics**:
  - **RPM**: Rate per mile (rate ÷ trip miles)
  - **RPM+DH**: Rate per mile including deadhead (rate ÷ total miles)
  - **Fuel Cost**: Calculated based on total miles, MPG, and diesel price
  - **Driver's Pay**: Based on total miles and CPM
  - **Profit**: Net profit after all costs
- **Input Fields**: Miles, DH, Rate, Diesel/GL, MPG, Driver's CPM, Other Costs

### 📧 Email Management
- **Template System**: Pre-configured email templates for different scenarios
  - Load info request
  - Any news
  - Next day delivery
- **One-Click Email**: Send emails directly from the load board
- **Email Copy**: Quick copy-to-clipboard functionality for email addresses
- **Visual Feedback**: Button states show email status (✅ Sent, 📋 Copy Email)
- **Per-Load Isolation**: Each load row maintains independent email button states

### 🗺️ Map Integration
- **4-Column Layout**: Adds map as a dedicated 4th column in load details
- **Column Order**: Trip details → Map → Rate calculator → Company details
- **Google Maps Integration**: "Open Map" button opens route in Google Maps
- **Driver Location**: Uses current driver location from the website

## 📁 Project Structure

```
load connect/
├── manifest.json          # Extension configuration
├── content.js            # Main functionality script
├── background.js         # Background service worker
├── popup.html           # Extension popup interface
├── popup.js             # Popup functionality
├── oauth2.html          # OAuth authentication page
├── styles.css           # Custom styles
├── icons/
│   └── icon.png         # Extension icon
├── leaflet/             # Leaflet.js map library
│   ├── leaflet.js
│   ├── leaflet.css
│   ├── leaflet-routing-machine.min.js
│   ├── leaflet-routing-machine.css
│   └── images/          # Map marker icons
├── jquery-3.6.0.min.js  # jQuery library
└── notify.min.js        # Notification library
```

## 🛠️ Installation

### For Development
1. **Clone or Download** the project files
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select the project folder
5. **Navigate to** [one.dat.com](https://one.dat.com) to see the extension in action

### For Users
1. **Download** the extension files
2. **Follow the same steps** as development installation
3. **Refresh** the one.dat.com page to activate features

## 🔧 Configuration

### Driver Location Setup
The extension automatically detects driver location from the website's input field. Ensure the driver location is set in the one.dat.com interface for accurate route calculations.

### Email Templates
Email templates are configured in `content.js` and can be customized:
```javascript
const templates = [
    { key: 'template_1', label: 'Load info request' },
    { key: 'template_2', label: 'Any news' },
    { key: 'template_3', label: 'Next day Del' }
];
```

## 🎯 Usage

### Viewing Load Details
1. **Navigate** to one.dat.com and search for loads
2. **Expand** any load row to see detailed information
3. **View** the enhanced 4-column layout with:
   - Trip details (original)
   - Interactive route map (new)
   - Rate calculator (new)
   - Company details (original)

### Using the Rate Calculator
1. **Input Values**: Modify any field to see real-time calculations
2. **Auto-Population**: Miles and rate are automatically filled from load data
3. **DH Sync**: Deadhead distance updates automatically from map calculations
4. **Results**: View RPM, fuel costs, driver pay, and profit calculations

### Sending Emails
1. **Click** "✉️ Send Email" button next to any load
2. **Select** email template from dropdown
3. **Email** is sent automatically with load details
4. **Button** shows "✅ Sent" confirmation

### Copying Email Addresses
1. **Click** "📋 Copy Email" button
2. **Email** is copied to clipboard
3. **Button** shows "✅ Copied" confirmation

### Opening Maps
1. **Click** "📍 Open Map" button
2. **Google Maps** opens in new tab with route
3. **Route** shows driver → pickup → dropoff

## 🔌 Technical Details

### Dependencies
- **Leaflet.js**: Interactive maps and routing
- **Leaflet Routing Machine**: Route calculation and display
- **jQuery**: DOM manipulation utilities
- **Chrome Extension APIs**: Runtime messaging and storage

### APIs Used
- **OpenStreetMap Nominatim**: Geocoding (city to coordinates)
- **OpenStreetMap Tiles**: Map tiles for display
- **Chrome Runtime**: Extension communication

### Browser Compatibility
- **Chrome**: Full support
- **Edge**: Full support (Chromium-based)
- **Other Chromium browsers**: Should work with minor modifications

## 🐛 Troubleshooting

### Map Not Loading
- **Check internet connection** - maps require online access
- **Verify city names** - ensure pickup/dropoff cities are valid
- **Check console errors** - look for geocoding or map loading issues

### Rate Calculator Not Working
- **Refresh page** - ensure extension is loaded
- **Check load data** - verify miles and rate are available
- **Input validation** - ensure all fields have valid numbers

### Email Not Sending
- **Check extension permissions** - ensure email access is granted
- **Verify email templates** - check background.js configuration
- **Network issues** - ensure internet connection is stable

### Buttons Not Appearing
- **Refresh page** - extension may need to reload
- **Check selector changes** - website structure may have changed
- **Developer console** - look for JavaScript errors

## 🔄 Updates

### Version History
- **v1.0**: Initial release with basic map and calculator
- **v1.1**: Added email functionality and DH sync
- **v1.2**: Improved UI and added copy email feature

### Contributing
1. **Fork** the repository
2. **Create** feature branch
3. **Make** changes and test thoroughly
4. **Submit** pull request with detailed description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, questions, or feature requests:
- **Create an issue** on the project repository
- **Check troubleshooting** section above
- **Review console logs** for error details

## ⚠️ Disclaimer

This extension is not affiliated with one.dat.com. It's a third-party enhancement that modifies the website's functionality. Use at your own discretion and in accordance with the website's terms of service.

---
## 👨‍💻 Developer

### Samandar Sariboyev

- [Telegram](https://t.me/Samandar_developer)
- [Email](mailto:samandarsariboyev@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/samandar-sariboyev-1420b7213/)
- [YouTube](https://www.youtube.com/@samandar_sariboyev)