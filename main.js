let material_manager = document.getElementById("material_manager")

class material{
    constructor(density, color, id, name){
        this.density = density
        this.color = color
        this.id = id
        this.name = name
    }

    getMaterialDiv(){
        let id = "materialColor" + this.id

        let tempMaterialString = "<div class=\"material_config\"><form><b>" + this.name + ";</b> Color: <input name=\"color\" type=\"text\" id=\""
         + id + "\" class=\"color_input\" value=\"" + this.color + "\"></form> </div>"

        return tempMaterialString
    }
}

function load(){
    gray = new material(1.0, "FFFFFF", 0, "gray")
    for (let i = 0; i < 20; i++){
        material_manager.innerHTML += gray.getMaterialDiv()
    }
    //document.getElementById("material" + gray.id).value = "FFFFFF"
    //print(document.getElementById("material" + gray.id).value)
}

function print(a){
    document.getElementById("consoleDiv").innerHTML += a + "<br>"
}