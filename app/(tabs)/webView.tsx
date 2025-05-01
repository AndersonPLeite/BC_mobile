import React, { useEffect, useState } from "react";
import { Platform, ActivityIndicator, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const TradingViewWidget = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );
        const data = await response.json();

        // Gera o HTML com os dados da API
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 10px;
                  background-color: #f4f4f4;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #102237;
                  color: white;
                }
              </style>
            </head>
            <body>
              <h1>Top 10 Criptomoedas</h1>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price (USD)</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  ${data
                    .map(
                      (coin: any, index: number) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${coin.name}</td>
                      <td>$${coin.current_price.toFixed(2)}</td>
                      <td>$${coin.market_cap.toLocaleString()}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </body>
          </html>
        `;

        setHtmlContent(html);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    fetchData();
  }, []);

  if (Platform.OS === "web") {
    return (
      <iframe
        srcDoc={htmlContent || "<p>Carregando...</p>"}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="TradingView Widget"
      />
    );
  }

  if (!htmlContent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#102237" />
      </View>
    );
  }

  return (
    <WebView
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
});

export default TradingViewWidget;