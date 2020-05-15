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
		backgroundColor: "white"
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
	},
	notificationSuccess: {
        backgroundColor: "green",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: "center",
    },
	notificationError: {
        backgroundColor: "red",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: "center",
    }
});