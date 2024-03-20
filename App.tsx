import React, { useEffect, useState } from 'react'
import {
	Button,
	Dimensions,
	Image,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

const screenWidth = Dimensions.get('window').width
const blockHeight = (screenWidth * 16) / 9

const ImageCropScreen = () => {
	const [image, setImage] = useState<{ uri: string } | null>(null)
	const [sizeOfImage, setSizeOfImage] = useState({ width: 0, height: 0 })

	const openImagePicker = () => {
		ImagePicker.openPicker({
			width: 1600,
			height: 900,
			cropping: true,
			cropperChooseText: 'Завершить',
			cropperCancelText: 'Отмена',
			cropperToolbarTitle: 'Обрезать изображение',
		})
			.then(croppedImage => {
				setImage({ uri: croppedImage.path })
			})
			.catch(e => {
				console.log(e)
			})
	}

	useEffect(() => {
		if (image) {
			Image.getSize(image.uri, (width, height) => {
				setSizeOfImage({ width, height })
			})
		}
	}, [image])

	console.log(sizeOfImage)

	console.log(
		`Height of 16:9 block: ${blockHeight.toFixed(
			3
		)}, width - ${screenWidth.toFixed(3)}}`
	)

	return (
		<View style={styles.container}>
			{!image && (
				<Button title='Загрузить изображение' onPress={openImagePicker} />
			)}
			{image && (
				<View
					style={[
						styles.imageContainer,
						{ width: screenWidth, height: blockHeight },
					]}
				>
					<Image source={image} style={styles.image} />
				</View>
			)}
		</View>
	)
}

function App() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ImageCropScreen />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	imageContainer: {
		borderWidth: 1,
		borderColor: 'teal',
		marginTop: 20,
	},
	image: {
		width: '100%',
		height: '100%',
	},
})

export default App
