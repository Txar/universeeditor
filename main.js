let material_manager = document.getElementById("material_manager")
let material_editor = document.getElementById("material_editor")
let materials = []
let selectedMaterial = 0
let G = 0.00000000006674
//G = 1

let screen = document.getElementById("screen")
var ctx

let planet_manager = document.getElementById("planet_manager")
let planet_editor = document.getElementById("planet_editor")
let planets = []
let selectedPlanet = 0

let world_manager = document.getElementById("world_manager")
let cameraCenteredOn = 0 //planet id

let center_planet = 0

function distance(x0, x1){ 
    let d = 0

    let a0 = x0
    let a1 = x1

    if (a0 < 0){
        if (a1 < 0){
            d = Math.abs(a0 + a1)
        }
        else {
            d = Math.abs(a0) + a1
        }
    }

    else {
        if (a1 < 0){
            d = a0 + Math.abs(a1)
        }
        else {
            d = Math.abs(a0 - a1)
        }
    }

    return d
}

function pointDistance(point_a, point_b){
	let x_distance = distance(point_a.x, point_b.x)
	let y_distance = distance(point_a.y, point_b.y)
	let d = Math.sqrt((x_distance * x_distance) + (y_distance * y_distance))
	
	return d
}

window.addEventListener('resize', function(event){
    setCanvasSize()
});

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
        this.x = x
        this.y = y
        this.x2 = x2
        this.y2 = y2
    }
}

class Planet{
    constructor(name, m, radius, x, y, velocityVector, id){
        this.material_id = m
        this.radius = radius
        this.mass = Math.PI * radius * radius * materials[this.material_id].density

        this.initialVector = new CoordinateVector(x, y, velocityVector.x, velocityVector.y)
        
        this.x = x
        this.y = y
        this.velocity = velocityVector

        this.id = id
        this.name = name
    }

    updateStats(){
        this.color = materials[this.material_id].color
        this.mass = Math.PI * this.radius * this.radius * materials[this.material_id].density
    }

    updateStatus(){
        let F
        for (let i = 0; i < planets.length; i++){
            F = 0
            if (i == this.id){
                continue
            }

            F = (G * Number(this.mass) * Number(planets[i].mass))
            this.accelerateTowards(new Vector(planets[i].x,  planets[i].y), F)
        }

        for (let i = 0; i < planets.length; i++){
            if (i == this.id){
                continue
            }

            if ((this.x + this.radius + this.velocity.x > planets[i].x - planets[i].radius && this.x + this.radius + this.velocity.x < planets[i].x + planets[i].radius) 
            || (this.x - this.radius + this.velocity.x > planets[i].x - planets[i].radius && this.x - this.radius + this.velocity.x < planets[i].x + planets[i].radius)){

                if ((this.y > planets[i].y - planets[i].radius && this.y < planets[i].y + planets[i].radius) 
                || (this.y > planets[i].y - planets[i].radius && this.y < planets[i].y + planets[i].radius)){

                    this.velocity.x = 0

                }
            }

            if ((this.y + this.radius + this.velocity.y > planets[i].y - planets[i].radius && this.y + this.radius + this.velocity.y < planets[i].y + planets[i].radius) 
            || (this.y - this.radius + this.velocity.y > planets[i].y - planets[i].radius && this.y - this.radius + this.velocity.y < planets[i].y + planets[i].radius)){

                if ((this.x > planets[i].x - planets[i].radius && this.x < planets[i].x + planets[i].radius) 
                || (this.x > planets[i].x - planets[i].radius && this.x < planets[i].x + planets[i].radius)){

                    this.velocity.y = 0

                }
            }
        }

        this.x = Number(this.x) + Number(this.velocity.x)
        this.y = Number(this.y) + Number(this.velocity.y)
    }d

    accelerateTowards(point, force){

		let d = pointDistance(this, point)

        force = Number(force)
        let tf = Number(force / 2 / d)
        
        d = d * d

        if (d != 0){
            if (this.x > point.x){

                this.velocity.x = Number(this.velocity.x) - (force / 2 / d)

                tf = tf - (force / 2 / d)
            }

            else if (this.x < point.x){

                this.velocity.x = Number(this.velocity.x) + (force / 2 / d)

                tf = tf - (force / 2 / d)
            }
        } 

        if (d != 0){ 
            if (this.y > point.y){

                this.velocity.y = Number(this.velocity.y) - (force / 2 / d)

                tf = tf - (force / 2 / d)
            }

            else if (this.y < point.y){

                this.velocity.y = Number(this.velocity.y) + (force / 2 / d)

                tf = tf - (force / 2 / d)
            }
        }       

        if (tf > 0){
			console.log("a")
            if (Math.abs(distance(point.y, this.y)) > Math.abs(distance(point.x, this.x))){

                if (this.y + this.velocity.y > point.y){
                    this.velocity.y = this.velocity.y - tf
                }
                else {
                    this.velocity.y = this.velocity.y + tf
                }

            }
            else {

                if (this.x + this.velocity.x > point.x){
                    this.velocity.x = this.velocity.x - tf
                }
                else {
                    this.velocity.x = this.velocity.x + tf
                }
            }
        }
    }

    reset(){
        this.x = this.initialVector.x
        this.y = this.initialVector.y
        this.velocity.x = this.initialVector.x2
        this.velocity.y = this.initialVector.y2
    }

    draw(){
        drawCircle(this.x, this.y, this.color, this.radius)
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

        tempPlanetString = "<div class=\"editor_input_names\"> id: <br> name: <br> material: <br> initial x: "
        + "<br> initial y: <br> initial x velocity: <br> initial y velocity: <br> radius: </div>"
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
        
        tempPlanetString += "</select> <br> <input type=\"number\" id=\"initial_planet_x\" onchange=\"updateInitialCoordinates(" 

        + this.id + ")\" value=\"" + this.initialVector.x 

        + "\"> <br> <input type=\"number\" id=\"initial_planet_y\" onchange=\"updateInitialCoordinates(" + this.id + ")\" value=\"" 

        + this.initialVector.y + "\"> <br> <input type=\"number\" id=\"initial_planet_velocity_x\" onchange=\"updateInitialVelocity(" + this.id 

        + ")\" value=\"" + this.initialVector.x2 + "\"> <br> <input type=\"number\" id=\"initial_planet_velocity_y\" onchange=\"updateInitialVelocity(" + this.id 

        + ")\" value=\"" + this.initialVector.y2 + "\"> <br> <input type=\"number\" id=\"planet_radius\" onchange=\"updateRadius("

        + this.id + ")\" value=\"" + this.radius + "\"> </form>"

        return tempPlanetString
    }
}

function drawCircle(x, y, color, size){
    ctx.fillStyle = "#" + color
    ctx.beginPath()
    ctx.ellipse(x - (planets[center_planet].x - (screen.width / 2)), y - (planets[center_planet].y - (screen.height / 2)), size, size, 0, 0, Math.PI * 2)
    ctx.fill()
}

function setCanvasSize(){
    let width = screen.clientWidth
    let height = screen.clientHeight

    if (screen.width !== width || screen.height !== height) {
        screen.width = width
        screen.height = height
    }
}

function load(){
    setCanvasSize()

    ctx = screen.getContext("2d")

    ctx.clearRect(0, 0, screen.width, screen.height);

    updateWorldManager()

    resetUniverse()

    setInterval(updateUniverse, 1000 / 60);
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

function updateRadius(id){
    planets[id].radius = document.getElementById("planet_radius").value
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

function updateInitialCoordinates(id){
    planets[id].initialVector.x = document.getElementById("initial_planet_x").value
    planets[id].initialVector.y = document.getElementById("initial_planet_y").value
    updatePlanets()
}

function updateInitialVelocity(id){
    planets[id].initialVector.x2 = document.getElementById("initial_planet_velocity_x").value
    planets[id].initialVector.y2 = document.getElementById("initial_planet_velocity_y").value
    updatePlanets()
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
        planets[i].updateStats()
        planet_manager.innerHTML += planets[i].getPlanetDiv()
    }
    if (planets.length != 0){
        updatePlanetEditor()
    }
    else {
        planet_editor.innerHTML = ""
    }
    updateWorldManager()
}

function updateWorldManager(){
    world_manager.innerHTML = getWorldManagerDiv()
}

function removeMaterial(id){
    materials.splice(id, 1)
    updateMaterials()
}

function removePlanet(id){
    planets.splice(id, 1)
    updatePlanets()
}

function getWorldManagerDiv(){
    let tempString = ""

    tempString += "<div class=\"editor_input_names\"> "
    + "camera centered on: "

    if (planets.length > 0){
        tempString += "<br> planet's x: <div id=\"center_x\">" + planets[center_planet].x + "</div><br> planet's y: <div id=\"center_y\">" + planets[center_planet].y + "</div>"
    }

    tempString += "<br><form style=\"float: left;\"> <button type=\"button\" onclick=\"resetUniverse()\">reset simulation</button> </form> </div>"

    tempString += "<form class=\"editor_form\"> <select id=\"center_selection\" name=\"center_planet_select\" onchange=\"setCenter()\">"

    for (let i = 0; i < planets.length; i++){
        if (i == center_planet){
            tempString += "<option value=\"" + i + "\" selected>" + planets[i].name + " (id " + i + ")</option>"
        }
        else {
            tempString += "<option value=\"" + i + "\">" + planets[i].name + " (id " + i + ")</option>"
        }
    }

    tempString += "</select> </form>"

    return tempString
}

function setCenter(){
    center_planet = document.getElementById("center_selection").value
}

function resetUniverse(){
    for (let i = 0; i < planets.length; i++){
        planets[i].reset()
    }
}

function updateUniverse(){
    ctx.clearRect(0, 0, screen.width, screen.height);

    for (let i = 0; i < planets.length; i++){
        planets[i].updateStatus()
        planets[i].draw()
    }

    if (planets.length > 0){
        document.getElementById("center_x").innerHTML = planets[center_planet].x
        document.getElementById("center_y").innerHTML = planets[center_planet].y
    }
}
