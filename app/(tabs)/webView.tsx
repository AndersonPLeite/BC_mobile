import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const TradingViewWidget = () => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src="https://s.tradingview.com/embed-widget/market-quotes/?locale=pt_BR"
        style={{ width: 350, height: 800 }}
        title="TradingView Widget"
      />
    );
  }

  return (
    <WebView
      style={{ width: 350, height: 800 }}
      originWhitelist={['*']}
      source={{
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
              <iframe
                src="https://s.tradingview.com/embed-widget/market-quotes/?locale=pt_BR"
                style="width: 100%; height: 100%; border: none;"
                title="TradingView Widget"
              ></iframe>
            </body>
          </html>
        `,
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

export default TradingViewWidget;