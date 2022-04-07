let material_manager = document.getElementById("material_manager")
let material_editor = document.getElementById("material_editor")
let materials = []
let selectedMaterial

class material{
    constructor(density, color, id, name){
        this.density = density
        this.color = color
        this.id = id
        this.name = name
    }

    getMaterialDiv(){
        //let id = "materialColor" + this.id

        //let tempMaterialString = "<div onclick=\"print(\'test\')\" class=\"material_element\"><form>" + this.name + "; Color: <input name=\"color\" type=\"text\" id=\""
        // + id + "\" class=\"color_input\" value=\"" + this.color + 
        // "\"> <button type=\"button\" onclick=\"removeMaterial(" + this.id + ")\">remove</button></form> </div>"
        
        let tempMaterialString

        if (this.id == selectedMaterial){
            tempMaterialString = "<div onclick=\"selectMaterial("
            + this.id + ")\" class=\"selected_material_element\">"
            + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removeMaterial("
            + this.id + ")\">remove</button></form> <div class=\"color_preview\" style=\"background-color: #"
            + this.color + ";\"></div> </div>"
        }
        else {
            tempMaterialString = "<div onclick=\"selectMaterial(" + this.id + ")\" class=\"material_element\">"
            + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removeMaterial("
            + this.id + ")\">remove</button></form> <div class=\"color_preview\" style=\"background-color: #"
            + this.color + ";\"></div> </div>"
        }

        return tempMaterialString
    }

    getMaterialEditorDiv(){
        let tempMaterialString

        tempMaterialString = "<div class=\"editor_input_names\"> name: <br> density: <br> color: </div>"
        
        + "<form class=\"editor_form\"> <input type=\"text\" name=\"name\" id=\"name_input\" onchange=\"updateName(" 
        
        + this.id + ")\" value=\"" + this.name + "\"> <br> <input type=\"number\" id=\"density_input\" name=\"density\" value=\"" 
        
        + this.density + "\" onchange=\"updateDensity(" 
        
        + this.id + ")\"> <br> <input type=\"text\" id=\"color_input\" name=\"color\" value=\""
        
        + this.color + "\" onchange=\"updateColor(" + this.id 
        
        + ")\"> </form>"

        return tempMaterialString
    }
}

function load(){
    
}

function addMaterial(){
    tempMaterial = new material(1.0, "FFFFFF", materials.length, "newMaterial" + materials.length)
    materials.push(tempMaterial)
    updateMaterials()
}

function updateDensity(id){
    materials[id].density = document.getElementById("density_input").value
    updateMaterials()
}

function updateName(id){
    materials[id].name = document.getElementById("name_input").value
    updateMaterials()
}

function updateColor(id){
    materials[id].color = document.getElementById("color_input").value
    updateMaterials()
}

function selectMaterial(id){
    selectedMaterial = id
    print(id)
    updateMaterials()
}

function updateMaterialEditor(){
    material_editor.innerHTML = materials[selectedMaterial].getMaterialEditorDiv()
}

function updateMaterials(){
    material_manager.innerHTML = ""
    for (let i = 0; i < materials.length; i++){
        materials[i].id = i;
        material_manager.innerHTML += materials[i].getMaterialDiv()
    }
    updateMaterialEditor()
}

function removeMaterial(id){
    materials.splice(id, 1)
    updateMaterials()
}

function print(a){
    document.getElementById("consoleDiv").innerHTML += a + "<br>"
}