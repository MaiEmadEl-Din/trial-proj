import { iconSetMaterial, themeMaterial } from 'ag-grid-community';

export const appAgGridTheme = themeMaterial
  .withPart(iconSetMaterial)
  .withParams({
    backgroundColor: "#fff",
    headerBackgroundColor: "#F2F2F2",
    foregroundColor: "181D1F",
    headerTextColor: "#181D1F",
    headerFontSize: 16,
    headerFontWeight: 700,
    selectCellBackgroundColor: "#FF0000",
    checkboxCheckedBackgroundColor: "#5ca0d5",
    fontSize: 14,

    headerFontFamily: {
      googleFont: "Cairo",
    },
    cellFontFamily: [
      "Cairo"
    ],
    rowHoverColor: "#F2F2F2",
    wrapperBorder: true,
    wrapperBorderRadius: 20,
    borderColor: "#E6E6E6",
    
    borderWidth: 1,
  });