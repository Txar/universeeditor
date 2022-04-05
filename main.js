let material_manager = document.getElementById("material_manager")
let materials = []

class material{
    constructor(density, color, id, name){
        this.density = density
        this.color = color
        this.id = id
        this.name = name
    }

    getMaterialDiv(){
        let id = "materialColor" + this.id

        //let tempMaterialString = "<div onclick=\"print(\'test\')\" class=\"material_element\"><form>" + this.name + "; Color: <input name=\"color\" type=\"text\" id=\""
        // + id + "\" class=\"color_input\" value=\"" + this.color + 
        // "\"> <button type=\"button\" onclick=\"removeMaterial(" + this.id + ")\">remove</button></form> </div>"

        let tempMaterialString = "<div onclick=\"print(\'test\')\" class=\"material_element\">"
         + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removeMaterial("
          + this.id + ")\">remove</button></form> <div class=\"color_preview\" style=\"background-color: #"
         + this.color + "\";></div> </div>"

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

function updateMaterials(){
    material_manager.innerHTML = ""
    for (let i = 0; i < materials.length; i++){
        materials[i].id = i;
        material_manager.innerHTML += materials[i].getMaterialDiv()
    }
}

function removeMaterial(id){
    materials.splice(id, 1)
    updateMaterials()
}

function print(a){
    document.getElementById("consoleDiv").innerHTML += a + "<br>"
}