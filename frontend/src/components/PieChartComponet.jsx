// import React from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { PieChart as GiftedPieChart } from "react-native-gifted-charts";

// const PieChartComponet = ({ title, data, loading, noDataMessage = "No data available" }) => {
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#5b21b6" />
//         <Text style={styles.loadingText}>Loading chart data...</Text>
//       </View>
//     );
//   }
//   let showChart = 1;
//   if (!data || data.length === 0) {
//     showChart = 0;
//   }

//   return (
//     <View style={styles.contentContainer}>
//       {title && <Text style={styles.title}>{title}</Text>}
//       {showChart && <GiftedPieChart
//         data={data}
//         showText
//         textColor="#5b21b6"
//         labelsPosition="outside"
//         focusOnPress
//         animationDuration={800}
//         donut
//         innerRadius={60}
//         radius={100}
//         textFontSize={14}
//         textFontWeight="600"
//       />}
// {showChart && 
// <View style={styles.legendContainer}>
//   {data.map(({ label, color }) => (
//     <View key={label} style={styles.legendItem}>
//       <View style={[styles.legendColorBox, { backgroundColor: color }]} />
//       <Text style={styles.legendLabel}>{label}</Text>
//     </View>
//   ))}
// </View>}
//       {!showChart && <Text style={styles.noDataText}>{noDataMessage}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     contentContainer: {
//     alignItems: "center",
//     width: "100%",
//   },
//   container: {
//     padding: 16,
//     alignItems: "center",
//     backgroundColor: "white",
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: "#5b21b6",
//   },
//   loadingContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#5b21b6",
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "#999",
//     textAlign: "center",
//     paddingVertical: 20,
//   },
  // legendContainer: {
  //   marginTop: 16,
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "center",
  // },
  // legendItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginHorizontal: 8,
  //   marginVertical: 4,
  // },
  // legendColorBox: {
  //   width: 16,
  //   height: 16,
  //   borderRadius: 3,
  //   marginRight: 6,
  // },
  // legendLabel: {
  //   fontSize: 14,
  //   color: "#333",
  // },
// });

// export default PieChartComponet;


import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { PieChart as GiftedPieChart } from "react-native-gifted-charts";

const PieChartComponent = ({
  title,
  data,
  loading,
  noDataMessage = "No data available",
  isDark = false,
  showValues = true,
  showPercentage = true,
  radius = 110,
}) => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color={isDark ? "#a78bfa" : "#5b21b6"} />
        <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
          Loading chart data...
        </Text>
      </View>
    );
  }

  const showChart = data && data.length > 0;

  // Calculate total value for percentage
  const totalValue = data?.reduce((sum, item) => sum + (item.value || 0), 0) || 0;

  // Enhance data with percentage
  const enhancedData = data?.map((item) => ({
    ...item,
    percentage: totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : 0,
    text: showPercentage ? `${((item.value / totalValue) * 100).toFixed(1)}%` : item.value.toString(),
  }));

  // Center label content

  return (
    <View>
      {title && (
        <View style={styles.headerContainer}>
          <Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
          {showChart && (
            <Text style={[styles.totalLabel, isDark && styles.totalLabelDark]}>
              Total: {totalValue}
            </Text>
          )}
        </View>
      )}

      {showChart ? (
        <>
          <View style={styles.chartContainer}>
            <GiftedPieChart
              data={enhancedData}
              showText={showValues}
              textColor={isDark ? "#e0e7ff" : "#e0e7ff"}
              textSize={13}
              fontWeight="bold"
              textBackgroundRadius={16}
              labelsPosition="mid"
              animationDuration={800}
              radius={radius}
              strokeColor={isDark ? "#1e1b4b" : "#ffffff"}
              strokeWidth={3}
              textFontWeight="600"
              showValuesAsLabels={showValues}
            />
          </View>

          {/* Modern Legend with Value Display */}
          <View style={styles.legendContainer}>
            {data.map(({ label, color }) => (
              <View key={label} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: color }]} />
                <Text style={styles.legendLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={[styles.noDataText, isDark && styles.noDataTextDark]}>
            {noDataMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5b21b6",
    marginBottom: 4,
  },
  titleDark: {
    color: "#c4b5fd",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  totalLabelDark: {
    color: "#9ca3af",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  loadingContainerDark: {
    backgroundColor: "#1e1b4b",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#5b21b6",
    fontWeight: "500",
  },
  loadingTextDark: {
    color: "#a78bfa",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "relative",
  },
  centerLabelWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 120,
  },
  centerLabelValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5b21b6",
  },
  centerLabelValueDark: {
    color: "#c4b5fd",
  },
  centerLabelPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7c3aed",
    marginTop: 2,
  },
  centerLabelPercentageDark: {
    color: "#a78bfa",
  },
  centerLabelText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 4,
    textAlign: "center",
  },
  centerLabelTextDark: {
    color: "#9ca3af",
  },
  noDataContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    fontWeight: "500",
  },
  noDataTextDark: {
    color: "#6b7280",
  },
    legendContainer: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 14,
    color: "#333",
  },
  // legendContainer: {
  //   marginTop: 24,
  //   gap: 8,
  // },
  // legendItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingVertical: 12,
  //   paddingHorizontal: 16,
  //   backgroundColor: "#f9fafb",
  //   borderRadius: 12,
  //   borderWidth: 2,
  //   borderColor: "transparent",
  // },
  legendItemDark: {
    backgroundColor: "#312e81",
  },
  legendItemSelected: {
    backgroundColor: "#ede9fe",
    borderColor: "#7c3aed",
  },
  legendItemSelectedDark: {
    backgroundColor: "#4c1d95",
    borderColor: "#a78bfa",
  },
  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  // legendColorBox: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 6,
  //   marginRight: 12,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.15,
  //   shadowRadius: 4,
  //   shadowOffset: { width: 0, height: 2 },
  //   elevation: 2,
  // },
  // legendLabel: {
  //   fontSize: 15,
  //   fontWeight: "600",
  //   color: "#1f2937",
  //   flex: 1,
  // },
  legendLabelDark: {
    color: "#e5e7eb",
  },
  legendRight: {
    alignItems: "flex-end",
  },
  legendValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5b21b6",
  },
  legendValueDark: {
    color: "#c4b5fd",
  },
  legendPercentage: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 2,
  },
  legendPercentageDark: {
    color: "#9ca3af",
  },
});

export default PieChartComponent;
