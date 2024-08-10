function run(){
        //Setup[
        let scne = 'menu';
        let menu = true;
        let alive = true;
        let time = 0;
        let level = 1;
        let yPos = 0;
        let xPos = -82;
        let lvltxtEl = document.getElementById("lvl-txt");
        let menuEl = document.getElementById("menu");
        let mintxtEl = document.getElementById("min-txt");
        let plybtnEl = document.getElementById("ply-btn");
        let ledbtnEl = document.getElementById("led-btn");
        let levbtnEl = document.getElementById("lev-btn");
        let bckbtnEl = document.getElementById("bck-btn");
        let ledtxtEl = document.getElementById("led-txt");
        let howtxtEl = document.getElementById("how-txt");
        let diptxtEl = document.getElementById("dip-txt");
        let sphereimgEl = document.getElementById("sphere-img");
        let timeEl = document.getElementById("time");
        
        const canvas = document.getElementById('renderCanvas');
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        
        const gravityVector = new BABYLON.Vector3(0,-15,0);
        //edit const gravityVector = new BABYLON.Vector3(0, -250, 0);
        scene.enablePhysics(gravityVector, new BABYLON.CannonJSPlugin());
        
        var keys = {};
        window.addEventListener('keydown', function(e) {
            keys[e.key] = true;
        });
        window.addEventListener('keyup', function(e) {
            keys[e.key] = false;
        });
        
        scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
        //]
        //Create Player[
        const playerSphere = BABYLON.MeshBuilder.CreateSphere    ("playerSphere", {segments: 12, diameter: 4}, scene);
        
        playerSphere.material = new BABYLON.StandardMaterial("playerSphereMaterial", scene);
        playerSphere.material.diffuseColor = new BABYLON.Color3(0.016, 0.718, 0.922);
        
        playerSphere.position = new BABYLON.Vector3(0, 5, 0);
        playerSphere.physicsImpostor = new BABYLON.PhysicsImpostor(playerSphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0.9}, scene);
        //]
        //Create Camera[
        const camera = new BABYLON.ArcRotateCamera("Camera", 0, (3 * Math.PI) / 8, 20, playerSphere, scene);
        //edit camera.attachControl();
        //]
        //Create Light[
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        //]
        //Create Box Functions[
        function collide(p1X, p1Y, p1Z, p1W, p1H, p1D, p2X, p2Y, p2Z, p2W, p2H, p2D){
    return(p1X + p1W / 2 > p2X - p2W && p1X - p1W / 2 < p2X + p2W && p1Y + p1H / 2 > p2Y - p2H && p1Y - p1H / 2 < p2Y + p2H && p1Z + p1D / 2 > p2Z - p2D && p1Z - p1D / 2 < p2Z + p2D); 
        }
        function createCube(x, y, z, w, h, d, xrot, yrot, zrot, scene, port) {
            const Cube = BABYLON.MeshBuilder.CreateBox('cube', {width: w, height: h, depth: d}, scene);
            Cube.material = new BABYLON.StandardMaterial("cubeMaterial", scene);
            if (!port){
            Cube.material.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
            }else{
                Cube.material.diffuseColor = new BABYLON.Color3(0.271, 0.878, 0.196);
            }
            Cube.position = new BABYLON.Vector3(x, y, z);
            Cube.rotation.y = yrot;
            Cube.rotation.x = xrot;
            Cube.rotation.z = zrot;
            Cube.physicsImpostor = new BABYLON.PhysicsImpostor(Cube, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.9}, scene);
}
        //]
        //Draw Levels[
        //Level 1[
        createCube(-45, 0, 0, 100, 0.5, 12, 0, 0, 0, scene);
        createCube(-85, 5, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 2[
        createCube(-45, -1000, 0, 100, 0.5, 12, 0, 0, 0, scene);
        createCube(-45, -997, 0, 6, 6, 6, 0, 0.75, 0, scene);
        createCube(-85, -995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 3[
        createCube(-23, -2000, 0, 50, 0.5, 12, 0, 0, 0, scene);
        createCube(-155, -2000, 0, 20, 0.5, 12, 0, 0, 0, scene);
        createCube(-45, -1997, 0, 0.5, 10, 10, 0, 0, 0.75, scene);
        createCube(-160, -1995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 4[
        createCube(-23, -3000, 0, 50, 0.5, 12, 0, 0, 0, scene);
        createCube(-155, -3000, 0, 20, 0.5, 12, 0, 0, 0, scene);
        createCube(-45, -2999, 0, 5, 0.5, 10, 0, 0, 0, scene);
        createCube(-160, -2995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 5[
        createCube(-45, -4000, 0, 100, 0.5, 12, 0, 0, 0, scene);
        createCube(-30, -3996.5, 1, 7, 7, 7, 0, 0.75, 0, scene);
        createCube(-60, -3996.5, -1, 7, 7, 7, 0, 0.75, 0, scene);
        createCube(-85, -3995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 6[
        createCube(-45, -5000, 0, 100, 0.5, 12, 0, 0, 0, scene);
        createCube(-45, -4985, -2, 1, 30, 16, 0, 0, 0, scene);
        createCube(-45, -4985, 6, 100, 30, 1, 0, 0, 0, scene);
        //ramp
        createCube(-30, -4997, 0, 0.5, 10, 10, 0, -0.75, 0.75, scene);
        createCube(-85, -4995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 7[
        createCube(0, -6000, 0, 12, 0.5, 12, 0, 0, 0, scene);
        createCube(-3, -6000, 0, 2, 1.5, 2, 0, 0, 0, scene);
        
        createCube(-45, -6000, 0, 8, 0.5, 8, 0, 0, 0, scene);
        createCube(-46, -6000, 0, 2, 1.5, 2, 0, 0, 0, scene);
        
        createCube(-85, -5995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 8[
        createCube(0, -7000, 0, 12, 0.5, 1, 0, 0, 0, scene);
        
        createCube(-15, -7000, 3, 12, 0.5, 1, 0, 0, 0, scene);
        createCube(-30, -7000, -3, 12, 0.5, 1, 0, 0, 0, scene);
        createCube(-45, -7000, 3, 12, 0.5, 1, 0, 0, 0, scene);
        createCube(-60, -7000, -3, 12, 0.5, 1, 0, 0, 0, scene);
        
        createCube(-85, -6995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 9[
        createCube(0, -8000, 0, 12, 0.5, 12, 0, 0, 0, scene);
        
        createCube(-30, -8000, 0, 12, 0.5, 12, 0.75, 0, 0, scene);
        
        createCube(-60, -8000, 0, 12, 0.5, 12, -0.75, 0, 0, scene);
        
        createCube(-85, -7995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 10[
        createCube(0, -9000, 0, 12, 0.5, 12, 0, 0, 0, scene);
        createCube(-30, -9000, 0, 2, 0.5, 2, 0, 0, -0.75, scene);
        createCube(-85, -8995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 11[
        createCube(-45, -10000, 0, 100, 0.5, 0.5, 0, 0, 0, scene);
        createCube(-45, -9997.5, 0, 0.5, 5, 0.5, 0, 0, 0, scene);
        
        createCube(-85, -9995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //Level 12[
        createCube(0, -11000, 0, 12, 0.5, 12, 0, 0, 0, scene);
        createCube(-7, -10997, 0, 0.5, 10, 10, 0, 0, 0.75, scene);
        createCube(-30, -10995, -2, 10, 0.5, 0.5, 0, 0, 0, scene);
        createCube(-35, -10992.5, -2, 0.5, 5, 5, 0, 0, 0, scene);
        createCube(-60, -10995, 2, 10, 0.5, 0.5, 0, 0, 0, scene);
        createCube(-65, -10992.5, 2, 0.5, 5, 5, 0, 0, 0, scene);
        
        createCube(-85, -10995, 0, 1, 10, 10, 0, 0, 0, scene, true);
        //]
        //]
        //Run Scene[
        function start(){
            scne = 'game';
            menuEl.style.top = "-10000px";
        }
        function lead(){
            scne = 'lead';
            mintxtEl.innerHTML = "Lead";
            plybtnEl.style.display = "none";
            ledbtnEl.style.display = "none";
            levbtnEl.style.display = "none";
            bckbtnEl.style.display = "block";
            ledtxtEl.style.display = "block";
            diptxtEl.style.display = "none";
            sphereimgEl.style.display = "none";
        }
        function levels(){
            scne = 'levels';
            mintxtEl.innerHTML = "How";
            plybtnEl.style.display = "none";
            ledbtnEl.style.display = "none";
            levbtnEl.style.display = "none";
            bckbtnEl.style.display = "block";
            diptxtEl.style.display = "none";
            howtxtEl.style.display = "block";
            sphereimgEl.style.display = "none";
        }
        function back(){
            scne = 'menu';
            mintxtEl.innerHTML = "Sphere";
            plybtnEl.style.display = "block";
            ledbtnEl.style.display = "block";
            levbtnEl.style.display = "block";
            bckbtnEl.style.display = "none";
            ledtxtEl.style.display = "none";
            howtxtEl.style.display = "none";
            diptxtEl.style.display = "block";
            sphereimgEl.style.display = "block";
            sphereimgEl.style.position = 'absolute';
            sphereimgEl.style.left = '45%';
        }
        function win(){
            menuEl.style.top = "0px";
            mintxtEl.innerHTML = "You Won!";
            plybtnEl.style.display = "none";
            ledbtnEl.style.display = "none";
            levbtnEl.style.display = "none";
            bckbtnEl.style.display = "none";
            ledtxtEl.style.display = "none";
            howtxtEl.style.display = "block";
            howtxtEl.innerHTML = 'You beat the game with a time of '+Math.round(time)+'. Post your time in Discussions to get a chance to be on the leaderboard.<br><br>In order to have your score verified, you must show a screenshot as proof. I will still post non-verified scores, I will just add a note saying they aren’t verified. Thanks for playing!';
            diptxtEl.style.display = "none";
            sphereimgEl.style.display = "none";
        }
        scene.registerAfterRender(function() {
            //Movement & Velocity[
            var vel = playerSphere.physicsImpostor.getLinearVelocity();
            playerSphere.physicsImpostor.setLinearVelocity(vel.scale(.98));
            var forward = camera.getFrontPosition(1).subtract(camera.position);
            forward.y = 0;
            forward = forward.normalize().scale(1);
            var backward = BABYLON.Vector3.TransformCoordinates(forward, BABYLON.Matrix.RotationY(Math.PI));

            var left = BABYLON.Vector3.TransformCoordinates(forward, BABYLON.Matrix.RotationY((3 * Math.PI) / 2));

            var right = BABYLON.Vector3.TransformCoordinates(forward, BABYLON.Matrix.RotationY(Math.PI / 2));
            //]
            switch(scne){
                case 'menu':
                    plybtnEl.addEventListener("click", start);
                    ledbtnEl.addEventListener("click", lead);
                    levbtnEl.addEventListener("click", levels);
                break;
                case 'lead':
                    bckbtnEl.addEventListener("click", back);
                break;
                case 'levels':
                    bckbtnEl.addEventListener("click", back);
                break;
                case 'game':
            if (keys.w) {
                playerSphere.applyImpulse(forward, playerSphere.getAbsolutePosition());
            }
            if (keys.s) {
                playerSphere.applyImpulse(backward, playerSphere.getAbsolutePosition());
            }
            if (keys.a) {
                playerSphere.applyImpulse(left, playerSphere.getAbsolutePosition());
            }
            if (keys.d) {
                playerSphere.applyImpulse(right, playerSphere.getAbsolutePosition());
            }
            if (playerSphere.position.y < yPos-10) {
                //edit
                alive = false;
            }
            if (playerSphere.position.x < xPos && playerSphere.position.y > yPos && playerSphere.position.y < yPos+14 && playerSphere.position.z > -7 && playerSphere.position.z < 7) {
                level++;
                yPos -= 1000;
                playerSphere.position.x = 0;
                playerSphere.position.z = 0;
                playerSphere.position.y -= 1000;
                playerSphere.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
                playerSphere.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
                switch(level){
                    case 3:
                        xPos = -157;
                    break;
                    case 5:
                        xPos = -82;
                    break;
                }
            }
            if (!alive){
                playerSphere.position.x = 0;
                playerSphere.position.y = yPos+10;
                playerSphere.position.z = 0;
                playerSphere.physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
                playerSphere.physicsImpostor.setLinearVelocity( BABYLON.Vector3.Zero() );
                alive = true;
            }
            switch(level){
                case 1:
                    lvltxtEl.innerHTML = "<p>Level: 1</p><p>Welcome! Wasd to move. Get to the green portal.</p>";
                break;
                case 2:
                    lvltxtEl.innerHTML = "<p>Level: 2</p><p>Don't fall off the edge!</p>";
                break;
                case 3:
                    lvltxtEl.innerHTML = "<p>Level: 3</p><p>You can get into the air using ramps.</p>";
                break;
                case 4:
                    lvltxtEl.innerHTML = "<p>Level: 4</p><p>Or using flat boxes.</p>";
                break;
                case 5:
                    lvltxtEl.innerHTML = "<p>Level: 5</p><p>That's it for the tutorial!</p>";
                break;
                case 6:
                    lvltxtEl.innerHTML = "<p>Level: 6</p><p>Around the wall!</p>";
                break;
                case 7:
                    lvltxtEl.innerHTML = "<p>Level: 7</p><p>Be careful of momentum...</p>";
                break;
                case 8:
                    lvltxtEl.innerHTML = "<p>Level: 8</p><p>Those are skinny blocks... Try not to fall!</p>";
                break;
                case 9:
                    lvltxtEl.innerHTML = "<p>Level: 9</p><p>Getting tricky!</p>";
                break;
                case 10:
                    lvltxtEl.innerHTML = "<p>Level: 10</p><p>That's one small block!</p>";
                break;
                case 11:
                    lvltxtEl.innerHTML = "<p>Level: 11</p><p>Okay, second to last level...</p>";
                break;
                case 12:
                    lvltxtEl.innerHTML = "<p>Level: 12</p><p>Final level!</p>";
                break;
                case 13:
                    win();
                break;
            }
                break;
            }
            if (menuEl.style.top === "-10000px"){
                timeEl.innerHTML = 'Time: '+Math.round(time);
                time += 0.05;
            }
});
        //]
        //Run Stuff[
        engine.runRenderLoop(scene.render.bind(scene));
        window.addEventListener('resize', engine.resize.bind(engine));
        //]
    }
