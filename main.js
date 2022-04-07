let material_manager = document.getElementById("material_manager")
let material_editor = document.getElementById("material_editor")
let materials = []
let selectedMaterial = 0

let planet_manager = document.getElementById("planet_manager")
let planet_editor = document.getElementById("planet_editor")
let planets = []
let selectedPlanet = 0

class Material{
    constructor(density, color, id, name){
        this.density = density
        this.color = color
        this.id = id
        this.name = name
    }

    getMaterialDiv(){
        let tempMaterialString

        if (this.id == selectedMaterial){
            tempMaterialString = "<div onclick=\"selectMaterial("
            + this.id + ")\" class=\"selected_material_element unselectable\">"
            + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removeMaterial("
            + this.id + ")\">remove</button></form> <div class=\"color_preview\" style=\"background-color: #"
            + this.color + ";\"></div> </div>"
        }
        else {
            tempMaterialString = "<div onclick=\"selectMaterial(" + this.id + ")\" class=\"material_element unselectable\">"
            + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removeMaterial("
            + this.id + ")\">remove</button></form> <div class=\"color_preview\" style=\"background-color: #"
            + this.color + ";\"></div> </div>"
        }

        return tempMaterialString
    }

    getMaterialEditorDiv(){
        let tempMaterialString

        tempMaterialString = "<div class=\"editor_input_names\"> id: <br> name: <br> density: <br> color: </div>"
        
        + "<form class=\"editor_form\">" + this.id + " <br> <input type=\"text\" name=\"name\" id=\"material_name_input\" onchange=\"updateMaterialName(" 
        
        + this.id + ")\" value=\"" + this.name + "\"> <br> <input type=\"number\" id=\"density_input\" name=\"density\" value=\"" 
        
        + this.density + "\" onchange=\"updateDensity(" 
        
        + this.id + ")\"> <br> <input type=\"text\" id=\"color_input\" name=\"color\" value=\""
        
        + this.color + "\" onchange=\"updateColor(" + this.id 
        
        + ")\"> </form>"

        return tempMaterialString
    }
}

class Vector{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class CoordinateVector{
    constructor(x, y, x2, y2){
        this.coordinates = new Vector(x, y)
        this.vector = new Vector(x2, y2)
    }
}

class Planet{
    constructor(name, m, radius, x, y, velocityVector, id){
        this.material_id = m
        this.radius = radius
        this.mass = Math.PI * radius * radius * materials[this.material_id].density

        this.initialVector = new CoordinateVector(new Vector(x, y), velocityVector)
        
        this.x = x
        this.y = y
        this.velocity = velocityVector

        this.id = id
        this.name = name
    }

    getPlanetDiv(){
        let tempPlanetString

        if (this.id == selectedPlanet){
            tempPlanetString = "<div onclick=\"selectPlanet(" + this.id + ")\" class=\"selected_planet_element unselectable\">"
            + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removePlanet("
            + this.id + ")\">remove</button></form> <div id=\"round\" class=\"color_preview\" style=\"background-color: #"
            + materials[this.material_id].color + ";\"></div> </div>"
        }
        else {
            tempPlanetString = "<div onclick=\"selectPlanet(" + this.id + ")\" class=\"planet_element unselectable\">"
            + this.name + " <form class=\"float_right\"><button type=\"button\" onclick=\"removePlanet("
            + this.id + ")\">remove</button></form> <div id=\"round\" class=\"color_preview\" style=\"background-color: #"
            + materials[this.material_id].color + ";\"></div> </div>"
        }
        return tempPlanetString
    }

    getPlanetEditorDiv(){
        let tempPlanetString

        tempPlanetString = "<div class=\"editor_input_names\"> id: <br> name: <br> material: </div>"
        + "<form class=\"editor_form\">" + this.id + " <br> <input type=\"text\" name=\"name\" id=\"planet_name_input\" onchange=\"updatePlanetName(" 
        
        + this.id + ")\" value=\"" + this.name + "\"> <br> <select id=\"material_select\" onchange=\"updateMaterialSelection(" 
        + this.id + ")\">"
        
        for (let j = 0; j < materials.length; j++){
            if (j == this.material_id){
                tempPlanetString += "<option value=\"" + j + "\" selected>" + materials[j].name + " (id " + j + ")</option>"
            }
            else {
                tempPlanetString += "<option value=\"" + j + "\">" + materials[j].name + " (id " + j + ")</option>"
            }
        }
        
        tempPlanetString += "</select> </form>"

        return tempPlanetString
    }
}

function load(){
    
}

function addMaterial(){
    materials.push(new Material(1.0, "FFFFFF", materials.length, "newMaterial" + materials.length))
    updateMaterials()
}

function addPlanet(){
    if (materials.length == 0){
        addMaterial()
    }
    planets.push(new Planet("newPlanet" + planets.length, 0, 10.0, 0, 0, new Vector(0, 0), planets.length))
    updatePlanets()
}

function updateDensity(id){
    materials[id].density = document.getElementById("density_input").value
    updateMaterials()
}

function updateMaterialName(id){
    materials[id].name = document.getElementById("material_name_input").value
    updateMaterials()
}

function updatePlanetName(id){
    planets[id].name = document.getElementById("planet_name_input").value
    updatePlanets()
}

function updateMaterialSelection(id){
    planets[id].material_id = document.getElementById("material_select").value
    print(document.getElementById("material_select").value)
    updatePlanets()
}

function updateColor(id){
    materials[id].color = document.getElementById("color_input").value
    updateMaterials()
    updatePlanets()
}

function selectMaterial(id){
    selectedMaterial = id
    updateMaterials()
}

function selectPlanet(id){
    selectedPlanet = id
    updatePlanets()
}

function updateMaterialEditor(){
    material_editor.innerHTML = materials[selectedMaterial].getMaterialEditorDiv()
}

function updatePlanetEditor(){
    planet_editor.innerHTML = planets[selectedPlanet].getPlanetEditorDiv()
}

function updateMaterials(){
    material_manager.innerHTML = ""
    for (let i = 0; i < materials.length; i++){
        materials[i].id = i
        material_manager.innerHTML += materials[i].getMaterialDiv()
    }
    if (materials.length != 0){
        updateMaterialEditor()
        updatePlanets()
    }
    else {
        material_editor.innerHTML = ""
    }
}

function updatePlanets(){
    planet_manager.innerHTML = ""
    for (let i = 0; i < planets.length; i++){
        planets[i].id = i
        planet_manager.innerHTML += planets[i].getPlanetDiv()
    }
    if (planets.length != 0){
        updatePlanetEditor()
    }
    else {
        planet_editor.innerHTML = ""
    }
}

function removeMaterial(id){
    materials.splice(id, 1)
    updateMaterials()
}

function removePlanet(id){
    planets.splice(id, 1)
    updatePlanets()
}

function print(a){
    document.getElementById("consoleDiv").innerText += a
    document.getElementById("consoleDiv").innerHTML += "<br>"
}