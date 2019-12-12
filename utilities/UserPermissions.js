import Constants from "expo-constants"
import * as Permissions from "expo-permissions"

class UserPermissions {
	getCameraPermission = async () => {
		if(Constants.platform.ios){
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			if(status != "granted"){
				alert("Precisamos da sua permissão para acessar a Galeria")
			}
		}
	}
}

export default new UserPermissions();