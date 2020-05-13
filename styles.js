import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	contentContainer: {
		paddingHorizontal: 35,
		paddingTop: 150,
		paddingBottom: 70,

	},
	containerHeader: {
		marginTop: 30,
		padding: 10,
		paddingHorizontal:20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	imagenHeader:{
		width:150,
		height:50,
		resizeMode:"contain",
	},
	icons: {
		display: "flex",
		flexDirection: "row",
		padding: 10,
	},
	iconSearch: {
		paddingRight: 25,

	},
	title: {
		fontSize: 25,
		textAlign: "center",
		marginBottom: 25,

	},
	textError: {
		backgroundColor: "rgba(255, 0, 0 ,0.8)",
		color: "white",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10
	},
	inputs: {
		borderRadius: 15,
		borderColor: "rgba(0,0,0,0.3)",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 15,
	},

	buttom: {
		backgroundColor: "#b7c62f",
		padding: 20,
		borderRadius: 15,
		marginTop: 15,
	},
	textButton: {
		color: "white",
		textAlign: "center",
	},
	containerFooter: {
		position: 'absolute',
		bottom: 20,
		left:20,
		display: "flex",
		flexDirection: "column",
		backgroundColor:"rgba(0,0,0,0.05)",
		padding:10,
		paddingTop:20,
		borderRadius:30,

	},
	iconFooter: {
		paddingBottom:8,
	}
	// },
	// welcomeContainer: {
	//   alignItems: 'center',
	//   marginTop: 10,
	//   marginBottom: 20,
	// },
	// welcomeImage: {
	//   width: 100,
	//   height: 80,
	//   resizeMode: 'contain',
	//   marginTop: 3,
	//   marginLeft: -10,
	// },
	// getStartedContainer: {
	//   alignItems: 'center',
	//   marginHorizontal: 50,
	// },
	// codeHighlightText: {
	//   color: 'rgba(96,100,109, 0.8)',
	// },
	// codeHighlightContainer: {
	//   backgroundColor: 'rgba(0,0,0,0.05)',
	//   borderRadius: 3,
	//   paddingHorizontal: 4,
	// },
	// getStartedText: {
	//   fontSize: 17,
	//   color: 'rgba(96,100,109, 1)',
	//   lineHeight: 24,
	//   textAlign: 'center',
	// },
	// tabBarInfoContainer: {
	//   position: 'absolute',
	//   bottom: 0,
	//   left: 0,
	//   right: 0,
	//   ...Platform.select({
	//     ios: {
	//       shadowColor: 'black',
	//       shadowOffset: { width: 0, height: -3 },
	//       shadowOpacity: 0.1,
	//       shadowRadius: 3,
	//     },
	//     android: {
	//       elevation: 20,
	//     },
	//   }),
	//   alignItems: 'center',
	//   backgroundColor: '#fbfbfb',
	//   paddingVertical: 20,
	// },
	// tabBarInfoText: {
	//   fontSize: 17,
	//   color: 'rgba(96,100,109, 1)',
	//   textAlign: 'center',
	// },
	// navigationFilename: {
	//   marginTop: 5,
	// },
	// helpContainer: {
	//   marginTop: 15,
	//   alignItems: 'center',
	// },
	// helpLink: {
	//   paddingVertical: 15,
	// },
	// helpLinkText: {
	//   fontSize: 14,
	//   color: '#2e78b7',
	// },
});