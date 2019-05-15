var x = 0;
var a;
var b;
var started1 = false;
var right = false
var left = false
var jump = false
var player;
var playerspeed = 5;
var jumped = 0;
var jumpup = true
var enemys1 = []
var shootleft = false
var shootright = false
var shootup = false
var shootdown = false
var bullet = []
var money  = 0
var l = 0
var buletsleft = 60
var playermaxhelth = 50
var bulletdamage = 10
var bulletsmaxleft = 60
var powerupbullets
var poweruphealth
var time = 0
var enemys2 = []
var jumpdown = false
var r=0
var pixtime =0
var level = 1
var enemyspawntime = 0




function initialize() {
    player =(createImage("pic/redsq.PNG", "player1", 850 ,770 ,40 , 70,50,6,7,7));
    for (i=0;i<30;i++) {
        enemys1.push(createImage("pic/bluesq.PNG", "enemytype1", 1222, 780, 40, 60, 20, 5, 3,20))
    }
    for (i=0;i<20;i++){
        enemys2.push(createImage("pic/orangesq.PNG", "enemytype1", 1222, 780, 50, 60, 40, 10, 2,20))

    }
    powerupbullets = (createImage("pic/bullet.PNG", "powerup1", 999999 ,999999999 ,40 , 40,10))
    poweruphealth = (createImage("pic/heart.PNG", "powerup2", 99999999 ,999999999 ,40 , 40,10))
    for (i=0; i<60;i++) {
        bullet.push(createImage("pic/circle.png", "enemytype1", 99999999, 99999999999, 15, 15,0,10))
    }


}


function start1() {
    animate()
    started1 = true

}
function animate() {
    a = requestAnimationFrame(animate);
    makeinvis()
    l++
    // if (l > 151) {
    //     alert(player.top)
    //     alert(jump)
    // }
    stage();
    characterdraw();
    enemysdraw();
    charactermove();
    enemymovetoyou();
    startplayeshoot();
    playerbuletsshoot();
    enemysdie();
    enemyshityou()
    enemysspawn()
    enemysmoverandom()
    playerdie()
    powerups()
    platforms()
    fall_off_platforms()
    enemystrackplatform()
    enemysjump()
    enemyslandonplatforms()
    enemysfallofplatforms()
    pixltimepast()
    rounddone()


}



function stopanimate() {
    cancelAnimationFrame(a)
    b = requestAnimationFrame(stopanimate);
    makevis()
    stage()
    // alert()
}

function pixltimepast() {
    pixtime++
    // alert(pixtime)
}


function stage() {

    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 840, window.innerWidth, 10);
    ctx.fill();

    ctx.fillStyle= "#000000"
    ctx.font = "20px Aria"
    ctx.fillText("money: " + money,33,33)
    ctx.fillStyle= "#000000"
    ctx.font = "20px Aria"
    ctx.fillText("bullets left: " + buletsleft,33,66)
    ctx.font = "20px Aria"
    ctx.fillText("level: " + level,33,99)

    ctx.fillStyle = "#000000";
    ctx.fillRect(1200,32 , playermaxhelth * 2, 15);
    ctx.fill();

    ctx.fillStyle = "#ef0200";
    ctx.fillRect(1200,32 , player.health * 2, 15);
    ctx.fill();
    //the platforms
    ctx.fillStyle = "#000000";
    ctx.fillRect(210,700 ,300 ,10);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.fillRect(690,700 ,300 ,10 );
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.fillRect(1160,700 ,300 , 10);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.fillRect(450,540 ,300 ,10 );
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.fillRect(910, 540 ,300,10 );
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.fillRect(700,380 , 300,10 );
    ctx.fill();
}

function characterdraw(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.drawImage(player, player.left, player.top, player.width, player.height);
}
function enemysdraw() {
    var ctx = document.getElementById("myCanvas").getContext("2d");

    for (i = 0; i < enemys1.length; i++) {
        // alert(i)
        if (enemys1[i].alive == true) {
            ctx.drawImage(enemys1[i], enemys1[i].left, enemys1[i].top, enemys1[i].width, enemys1[i].height)

        }
    }
    for (i = 0; i < enemys2.length; i++) {
        // alert(i)
        if (enemys2[i].alive == true) {
    //         alert(i)
            ctx.drawImage(enemys2[i], enemys2[i].left, enemys2[i].top, enemys2[i].width, enemys2[i].height)
        }
    //
    }

}

function enemymovetoyou() {
    // alert("jdfhdjk")
    for (i = 0; i < enemys1.length; i++) {
        // alert(i)
        // alert((enemys1[i].left).toString())
        if (enemys1[i].left - player.left <= 200 && enemys1[i].left - player.left >= 40) {
            enemys1[i].moverandom = false
            enemys1[i].left -= enemys1[i].movespeed
            // alert((enemys1.left - player.left).toString())
        } else if (enemys1[i].left - player.left >= -200 && enemys1[i].left - player.left <= -40) {
            enemys1[i].moverandom = false
            enemys1[i].left += enemys1[i].movespeed
            // alert((enemys1.left - player.left).toString())


        } else {
            enemys1[i].moverandom = true

        }
    }

    for (i = 0; i < enemys2.length; i++) {
        // alert(i)
        // alert((enemys1[i].left).toString())
        if (enemys2[i].left - player.left <= 200 && enemys2[i].left - player.left >= 40) {
            enemys2[i].moverandom = false
            enemys2[i].left -= enemys2[i].movespeed
            // alert((enemys1.left - player.left).toString())
        } else if (enemys2[i].left - player.left >= -200 && enemys2[i].left - player.left <= -40) {
            enemys2[i].moverandom = false
            enemys2[i].left += enemys2[i].movespeed
            // alert((enemys1.left - player.left).toString())


        } else {
            enemys2[i].moverandom = true

        }
    }

}


function charactermove(){
    var temp = 0

    if (right == true && player.left >=0) {
        player.left-=playerspeed
    }
    if (left == true && player.left <= 1700 - player.width) {
        player.left+=playerspeed
    }
    if (jump == true){
        // alert()
        if (jumped <= 150 && jumpup == true){
            // alert("1")
            player.top-=10
            jumped+=10
            // jumpdown = true
        }

        else if ((jumpdown == true && player.top <=770) || jumped >= 20){
            // alert(jumpdown)
            player.top+=10
            jumped-=10
            jumpup = false
            if (temp <=1) {
                jumpdown = true
            }
            temp++
        }
        else {
            // alert(jump)
            jump = false
            x++;
            // document.getElementById("p3").innerHTML = x;
            jumpup = true
            jumped = 0
            jumpdown = false

        }
    }
}

function startplayeshoot() {
    // alert()
    var n = 0
    player.attacktime-=1
    // alert(player.attacktime)
    if (buletsleft > 0 &&  player.attacktime <= 0) {
        player.attacktime = 7

        if (shootdown) {
            shootdown = false
            for (i = 0; i < bullet.length; i++) {
                if (bullet[i].shooting == false) {
                    bullet[i].shooting = true
                    bullet[i].left = player.left + 20
                    bullet[i].top = player.top + 70
                    bullet[i].direction = "d"
                    buletsleft--
                    break
                }

            }
        }
        if (shootup) {
            // alert()
            shootup = false
            for (i = 0; i < bullet.length; i++) {
                if (bullet[i].shooting == false) {
                    bullet[i].shooting = true
                    bullet[i].left = player.left + 15
                    bullet[i].top = player.top
                    buletsleft--
                    bullet[i].direction = "u"
                    break
                }
                }


        }


        if (shootleft) {
            // alert()
            shootleft = false
            for (i = 0; i < bullet.length; i++) {
                if (bullet[i].shooting == false) {
                    bullet[i].shooting = true
                    bullet[i].left = player.left
                    bullet[i].top = player.top + 10
                    bullet[i].direction = "l"
                    buletsleft--
                    break
                }

            }

            }

        if (shootright) {
            // alert()
            shootright = false
            for (i = 0; i < bullet.length; i++) {
                // alert()
                if (bullet[i].shooting == false) {
                    bullet[i].shooting = true
                    bullet[i].left = player.left + 20
                    bullet[i].top = player.top + 10
                    bullet[i].direction = "r"
                    buletsleft--
                    break
                    }

                }


            }
        }

}

function playerbuletsshoot() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    // alert()
    for (i = 0; i < bullet.length; i++) {


        if (bullet[i].shooting == true) {
            // if (l > 151) {
            // alert()
                // alert("djhdfjkhk")
            // }
            if (bullet[i].direction == 'u') {
                bullet[i].top -= 7
                // alert()
            }

            if (bullet[i].direction == 'd') {
                bullet[i].top += 7
                // alert()
            }


            if (bullet[i].direction == 'l') {
                bullet[i].left -= 7
                // alert()
            }


            if (bullet[i].direction == 'r') {
                bullet[i].left += 7

            }


            for (e = 0; e < bullet.length; e++) {
                // alert()

                ctx.drawImage(bullet[e], bullet[e].left, bullet[e].top, bullet[e].width, bullet[e].height)

            }
            if ( bullet[i].left >= 1755 || bullet[i].left <= -10 || bullet[i].top >= 865 || bullet[i].top <= 10){
                bullet[i].shooting = false

            }

        }
    }
}

function enemysdie() {
    // alert(enemys1.length)
    for (i = 0; i < enemys1.length ; i++) {
        // alert("i :" + i)
        // alert(enemys1.length)
        // document.getElementById("enemy1").innerHTML = enemys1[i].alive
        // document.getElementById("enemy2").innerHTML = enemys1[i].alive
        if (enemys1[i].alive == true) {

            for (k = 0; k < bullet.length; k++) {
                // if (l > 101) {
                //     alert("k: " + k)
                // }
                if (bullet[k].shooting == true) {

                    if (l > 101) {
                     // alert(k)
                    }

                    if (bullet[k].left < enemys1[i].left + enemys1[i].width && bullet[k].left + bullet[k].width > enemys1[i].left && bullet[k].top - bullet[k].height < enemys1[i].top && bullet[k].top > enemys1[i].top - enemys1[i].height) {
                        // document.getElementById("enemy1").innerHTML = "collide"
                        bullet[k].shooting = false;
                        enemys1[i].health-=bulletdamage

                        if (enemys1[i].health <= 0) {
                            // alert("hfhf")
                            enemys1[i].alive = false;
                            money += 10;
                        }

                    }



                }

            }
            // alert(i)
        }

    }


    for (i = 0; i < enemys2.length ; i++) {
        // alert("i :" + i)
        // alert(enemys1.length)
        // document.getElementById("enemy1").innerHTML = enemys1[i].alive
        // document.getElementById("enemy2").innerHTML = enemys1[i].alive
        if (enemys2[i].alive == true) {

            for (k = 0; k < bullet.length; k++) {
                // if (l > 101) {
                //     alert("k: " + k)
                // }
                if (bullet[k].shooting == true) {

                    if (l > 101) {
                        // alert(k)
                    }

                    if (bullet[k].left < enemys2[i].left + enemys2[i].width && bullet[k].left + bullet[k].width > enemys2[i].left && bullet[k].top - bullet[k].height < enemys2[i].top && bullet[k].top > enemys2[i].top - enemys2[i].height) {
                        // document.getElementById("enemy1").innerHTML = "collide"
                        bullet[k].shooting = false;
                        enemys2[i].health-=bulletdamage

                        if (enemys2[i].health <= 0) {
                            // alert("hfhf")
                            enemys2[i].alive = false;
                            money += 15;
                        }

                    }



                }

            }
            // alert(i)
        }

    }
}

function enemysmoverandom() {
    var temp1
    for (i = 0;i <enemys1.length;i++){
        // alert()
        if (enemys1[i].moverandom == true){
            // alert()
            if (enemys1[i].alive == true){
                enemys1[i].directionchange--
            }
            // alert()
            temp1 = Math.floor(Math.random()*4)
            // alert(temp1)
            // alert()
            if (temp1 == 1 && enemys1[i].directionchange <=0){
                // alert(enemys1[i].directionchange)
                enemys1[i].direction = "l"
                enemys1[i].directionchange = 100
                // alert()
            } else if (temp1 == 2 && enemys1[i].directionchange <= 0) {
                // alert()
                enemys1[i].direction = "r"
                enemys1[i].directionchange = 100
            }

            if (enemys1[i].direction == "l"){
                // alert(enemys1[i].left)
                if (enemys1[i].left >= 0) {
                    // alert()
                    enemys1[i].left -= enemys1[i].movespeed
                }
            } else if (enemys1[i].direction == "r"){
                if ( enemys1[i].left <=1660) {
                    enemys1[i].left += enemys1[i].movespeed
                }
            }
        }


    }

    for (i = 0;i <enemys2.length;i++){
        // alert()
        if (enemys2[i].moverandom == true){
            // alert()
            if (enemys2[i].alive == true){
                enemys2[i].directionchange--
            }
            // alert()
            temp1 = Math.floor(Math.random()*4)
            // alert(temp1)
            // alert()
            if (temp1 == 1 && enemys2[i].directionchange <=0){
                // alert(enemys1[i].directionchange)
                enemys2[i].direction = "l"
                enemys2[i].directionchange = 100
                // alert()
            } else if (temp1 == 2 && enemys2[i].directionchange <= 0) {
                // alert()
                enemys2[i].direction = "r"
                enemys2[i].directionchange = 100
            }

            if (enemys2[i].direction == "l"){
                // alert(enemys1[i].left)
                if (enemys2[i].left >= 0) {
                    // alert()
                    enemys2[i].left -= enemys2[i].movespeed
                }
            } else if (enemys2[i].direction == "r"){
                if ( enemys2[i].left <=1660) {
                    enemys2[i].left += enemys2[i].movespeed
                }
            }
        }


    }

}
function platforms() {
    if (jumpdown == true){
        // alert(player.top +70)
        if (player.top +70 <= 700 + 10 && player.top + 70 >= 700 - 10){
           // alert()
            if (player.left + 40 >= 210 && player.left  <=510){
                player.top = 630
                jumpdown= false


            }

            else if (player.left + 40 >= 690 && player.left <=990){
                player.top = 630
                jumpdown= false

            }

            else if (player.left+ 40 >= 1160 && player.left <=1460){
                player.top = 630
                jumpdown= false

            }
        }

        if (player.top +70 <= 540 + 10 && player.top + 70 >= 540 - 10){
            if (player.left+ 40 >= 450 && player.left <=750){
                player.top = 470
                jumpdown= false

            }

            if (player.left + 40>= 910 && player.left <=1210){
                player.top = 470
                jumpdown= false

            }

        }

        if (player.top +70 <= 380 + 10 && player.top + 70 >= 380 - 10) {
            if (player.left+ 40 >= 700 && player.left <= 1000) {
                player.top = 310
                jumpdown= false

            }

        }
        }

}



function fall_off_platforms() {
    if (jump == false) {

            // document.getElementById("p2").innerHTML = r
            r++
        if (player.top + 70 <= 700 + 10 && player.top + 70 >= 700 - 10) {
            // alert()
            if (player.left >= 0 && player.left <= 210) {

                jumpdown = true
                jump = true
                jumpup = false

            } else if (player.left >= 510 + 40 && player.left + 40 <= 690) {
                jumpdown = true
                jump = true
                jumpup = false
            } else if (player.left >= 990 && player.left + 40 <= 1160) {
                jumpdown = true
                jump = true
                jumpup = false
            }else if (player.left >= 1460 && player.left + 40 <= 1700) {
                jumpdown = true
                jump = true
                jumpup = false
            }
            player.platformlevel = 1
        } else if (player.top + 70 <= 540 + 10 && player.top + 70 >= 540 - 10) {
            if (player.left >= 0 && player.left + 40 <= 450) {
                jumpdown = true
                jump = true
                jumpup = false
            } else if (player.left >= 750 && player.left + 40 <= 910) {
                jumpdown = true
                jump = true
                jumpup = false
            }else if (player.left >= 1210 && player.left + 40 <= 1700) {
                jumpdown = true
                jump = true
                jumpup = false
            }
            player.platformlevel = 2
        } else if (player.top + 70 <= 380 + 10 && player.top + 70 >= 380 - 10) {
            if (player.left >= 0 && player.left + 40 <= 700) {
                jump = true
                jumpdown = true
                jumpup = false
            }else if (player.left >= 1000 && player.left + 40 <= 1700) {
                jump = true
                jumpdown = true
                jumpup = false
            }
            player.platformlevel = 3
        }else {
            player.platformlevel = 0

        }


    }


}










function enemyshityou() {
    for (i = 0; i < enemys1.length; i++) {
        enemys1[i].attacktime-=1
        if (enemys1[i].alive == true) {
            // alert(enemys1[i].attacktime)
            if (enemys1[i].attacktime <= 0) {
                // alert('1')
                if (enemys1[i].left - player.left >= 0 && enemys1[i].left - player.left <= 40 && enemys1[i].top - 60 <= player.top && enemys1[i].top >= player.top) {
                    player.health -= enemys1[i].damage
                    // alert('2')
                } else if (enemys1[i].left - player.left >= -40 && enemys1[i].left - player.left <= 0 && enemys1[i].top - 60 <= player.top && enemys1[i].top >= player.top) {
                    player.health -= enemys1[i].damage
                    // alert(player.health)
                    // alert()
                }

                enemys1[i].attacktime = 20
            }
            // alert(enemys1[i].attacktime)
        }
        }

    for (i = 0; i < enemys2.length; i++) {
        enemys2[i].attacktime-=1
        if (enemys2[i].alive == true) {
            if (enemys2[i].attacktime <= 0) {
                if (enemys2[i].left - player.left >= 0 && enemys2[i].left - player.left <= 40 && enemys2[i].top - 60 <= player.top && enemys2[i].top >= player.top) {
                    player.health -= enemys2[i].damage
                    // alert(player.health)
                } else if (enemys2[i].left - player.left >= -40 && enemys2[i].left - player.left <= 0 && enemys2[i].top - 60 <= player.top && enemys2[i].top >= player.top) {
                    player.health -= enemys2[i].damage
                    // alert(player.health)
                    // alert()
                }

                enemys2[i].attacktime = 20
            }
            // alert(enemys1[i].attacktime)
        }
    }

    }

function playerdie() {
    if (player.health <= 0) {
        gamelost()

    }
}
function rounddone() {
    if (pixtime == 3600){
        // alert()
        level++

        if (level >= 3){
            money+= 50
            bulletsmaxleft+=10

        }

        startnewround()

    }
}





function startnewround() {
    player.health = playermaxhelth
    buletsleft = bulletsmaxleft
    for (i = 0; i<enemys1.length;i++){
        enemys1[i].health= 20
        enemys1[i].alive = true
        enemys1[i].enemysjumping = false
        enemys1[i].enemyjumped = 0
        enemys1[i].enemyjumpup = true
        enemys1[i].enemyjumpdown = false
    }

    for (i = 0; i<enemys2.length;i++){
        enemys2[i].health= 40
        enemys2[i].alive = true
        enemys2[i].enemysjumping = false
        enemys2[i].enemyjumped = 0
        enemys2[i].enemyjumpup = true
        enemys2[i].enemyjumpdown = false
    }

    for (i = 0; i<bullet.length;i++){
        bullet[i].shooting = false

    }

    pixtime =0


    stopanimate()
}

function buytime(buything) {
    // alert()
    if (buything == 'b' && money >= 50){
        money-=50
        bulletsmaxleft+=5
    }

    if (buything == 'h'&&money >= 70){
        money-=70
        playermaxhelth+=5
    }

    if (buything == 'g'&&money >= 150){
        money-=150
        bulletdamage*=2
    }



}


function makeinvis() {
    document.getElementById('b1').style.visibility="hidden"
    document.getElementById('b2').style.visibility="hidden"
    document.getElementById('b3').style.visibility="hidden"
    document.getElementById('b4').style.visibility="hidden"
    document.getElementById('b5').style.visibility="hidden"

    document.getElementById("b1").disabled = true
    document.getElementById("b2").disabled = true
    document.getElementById("b3").disabled = true
    document.getElementById("b4").disabled = true
    document.getElementById('b5').disabled = true
}

function makevis() {
    document.getElementById('b1').style.visibility="visible"
    document.getElementById('b2').style.visibility="visible"
    document.getElementById('b3').style.visibility="visible"
    document.getElementById('b5').style.visibility="visible"

    document.getElementById("b1").disabled = false
    document.getElementById("b2").disabled = false
    document.getElementById("b3").disabled = false
    document.getElementById('b5').disabled = false

}
function powerups() {
    time++
    var ctx = document.getElementById("myCanvas").getContext("2d");

    if (time >= 600) {
        // alert()
        var temp1 = Math.floor(Math.random() * 41)
        var temp2 = Math.floor(Math.random() * 3)
            // temp1 = 1
            // temp2 = 3
        if (temp1 == 1) {
            if (temp2 == 1) {
                powerupbullets.top = 795
                powerupbullets.left = 15
                powerupbullets.alive = true
            }
            else if (temp2 == 2) {
                powerupbullets.top = 795
                powerupbullets.left = 1650
                powerupbullets.alive = true
            }
            else if (temp2 == 3) {
                powerupbullets.top = 330
                powerupbullets.left = 850
                powerupbullets.alive = true
            }

        }
        else if (temp1 == 2) {

            if (temp2 == 1) {
                poweruphealth.top = 795
                poweruphealth.left = 15
                poweruphealth.alive = true
            }
            else if (temp2 == 2) {
                poweruphealth.top = 795
                poweruphealth.left = 1650
                poweruphealth.alive = true
            }
            else if (temp2 == 3) {
                poweruphealth.top = 330
                poweruphealth.left = 850
                poweruphealth.alive = true
            }



        }
        time = 0
    }

    if (powerupbullets.alive ==true){
        ctx.drawImage(powerupbullets, powerupbullets.left, powerupbullets.top, powerupbullets.width, powerupbullets.height);
        if (player.left < powerupbullets.left + powerupbullets.width && player.left + player.width > powerupbullets.left && player.top - player.height < powerupbullets.top && player.top > powerupbullets.top - powerupbullets.height){
           powerupbullets.alive= false
           buletsleft+=10
        }
    }

    if (poweruphealth.alive == true){
        ctx.drawImage(poweruphealth, poweruphealth.left, poweruphealth.top, poweruphealth.width, poweruphealth.height);
        if (player.left < poweruphealth.left + poweruphealth.width && player.left + player.width > poweruphealth.left && player.top - player.height < poweruphealth.top && player.top > poweruphealth.top - poweruphealth.height){
            poweruphealth.alive = false
            player.health+=10
        }
    }



}

function startnextround() {
    cancelAnimationFrame(b)
    // alert("1")
    for (i = 0;i< enemys1.length;i++){
        // alert(i)
        enemys1[i].top = 99999999999
        enemys1[i].left = 99999999999
        enemys1[i].alive = false

    }
    // alert("2")
    for (i = 0;i< enemys2.length;i++){
        enemys2[i].top = 9999000
        enemys2[i].left = 9999000
        enemys2[i].alive=false
    }
    // alert("3")
    for (i = 0;i< bullet.length;i++){
        bullet[i].top = 999900099
        bullet[i].left = 999900099
        bullet[i].shooting =false
    }
    //alert("4")
    player.top = 780
    player.left = 770
    player.health = playermaxhelth
    buletsleft = bulletsmaxleft
    pixtime =0

    // alert()

    animate()
}


function gamelost() {
    var ctx = document.getElementById("myCanvas").getContext("2d");

    cancelAnimationFrame(a)
    cancelAnimationFrame(b)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle= "#000000"
    ctx.font = "100px Aria"
    ctx.fillText("YOU HAVE LOST",540,405)


}

function enemysspawn(){
    enemyspawntime++
    if (level == 1){
        level1()
    }

    if (level == 2){
        level2()
    }

    if (level == 3){
        level3()
    }

    if (level == 4){
        // alert("sdjfh")
        level4()
    }
    if (level >= 5){
        level5()
    }

}

function level1() {
    if (enemyspawntime >= 200){
        enemyspawntime = 0
        var temp1 = Math.floor(Math.random(0)*3)
        // alert(temp1)
        // temp1 =0
        if (temp1 == 0){
            for (i=0;i < enemys1.length;i++){
                // alert(enemys1[i].alive)
                if (enemys1[i].alive == false){
                    // alert("ksdfjh")
                    enemys1[i].top = 640
                    enemys1[i].left = 740
                    enemys1[i].alive = true
                    break

                }
            }

        }else if (temp1 == 1){
            for (i=0;i < enemys1.length;i++){
                // alert(enemys1[i].alive)
                if (enemys1[i].alive == false){
                    // alert("ksdfjh")
                    enemys1[i].top = 780
                    enemys1[i].left = 1640
                    enemys1[i].alive = true
                    break

                }
            }

        }else if (temp1 == 2){
            for (i=0;i < enemys1.length;i++){
                // alert(enemys1[i].alive)
                if (enemys1[i].alive == false){
                    // alert("ksdfjh")
                    enemys1[i].top = 780
                    enemys1[i].left = 20
                    enemys1[i].alive = true
                    break

                }
            }

        }
    }


}

function level2() {
    var temp1 = Math.floor(Math.random(0)*3)
    var temp2 = Math.floor(Math.random(0)*50)

    if (enemyspawntime >= 150){
        enemyspawntime = 0
        if (temp2 == 1) {
            if (temp1 == 0){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 640
                        enemys2[i].left = 740
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 1640
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 20
                        enemys2[i].alive = true
                        break

                    }
                }

            }

        }else {
            if (temp1 == 0){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 640
                        enemys1[i].left = 740
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 1640
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 20
                        enemys1[i].alive = true
                        break

                    }
                }

            }

        }
    }


}

function level3() {
    if (enemyspawntime >= 100){
        enemyspawntime = 0
        var temp1 = Math.floor(Math.random(0)*3)
        var temp2 = Math.floor(Math.random(0)*10)
        if (temp2 == 1) {
            if (temp1 == 0){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 640
                        enemys2[i].left = 740
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 1640
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 20
                        enemys2[i].alive = true
                        break

                    }
                }

            }

        }else {
            if (temp1 == 0){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 640
                        enemys1[i].left = 740
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 1640
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 20
                        enemys1[i].alive = true
                        break

                    }
                }

            }

        }

    }


}

function level4() {
    if (enemyspawntime >= 70){
        enemyspawntime = 0
        var temp1 = Math.floor(Math.random(0)*3)
        var temp2 = Math.floor(Math.random(0)*3)
        if (temp2 == 1) {
            if (temp1 == 0){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 640
                        enemys2[i].left = 740
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 1640
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 20
                        enemys2[i].alive = true
                        break

                    }
                }

            }

        }else {
            if (temp1 == 0){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 640
                        enemys1[i].left = 740
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 1640
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 20
                        enemys1[i].alive = true
                        break

                    }
                }

            }

        }
    }


}

function level5() {
    if (enemyspawntime >= 40){
        enemyspawntime = 0
        var temp1 = Math.floor(Math.random(0)*3)
        var temp2 = Math.floor(Math.random(0)*3)
        if (temp2 == 1) {
            if (temp1 == 0){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 640
                        enemys2[i].left = 740
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys2.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 1640
                        enemys2[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys2[i].alive == false){
                        // alert("ksdfjh")
                        enemys2[i].top = 780
                        enemys2[i].left = 20
                        enemys2[i].alive = true
                        break

                    }
                }

            }

        }else {
            if (temp1 == 0){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 640
                        enemys1[i].left = 740
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 1){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 1640
                        enemys1[i].alive = true
                        break

                    }
                }

            }else if (temp1 == 2){
                for (i=0;i < enemys1.length;i++){
                    // alert(enemys1[i].alive)
                    if (enemys1[i].alive == false){
                        // alert("ksdfjh")
                        enemys1[i].top = 780
                        enemys1[i].left = 20
                        enemys1[i].alive = true
                        break

                    }
                }

            }

        }
    }


}


function cheatcode() {
    money = parseInt(prompt("how much money"))
    level = parseInt(prompt("what level"))
    buletsleft = parseInt(prompt("how many bullets"))



}

function enemystrackplatform() {
    for (i = 0;i < enemys1.length;i++) {
        if (enemys1[i].alive == true ) {
            // alert()
            if (enemys1[i].top + 60 <= 700 + 10 && enemys1[i].top + 60 >= 700 - 10) {
                // alert('3')

                enemys1[i].platformlevel = 1
            } else if (enemys1[i].top + 60 <= 540 + 10 && enemys1[i].top + 60 >= 540 - 10) {
                // alert('2')
                enemys1[i].platformlevel = 2
            } else if (enemys1[i].top + 60 <= 380 + 10) {


                enemys1[i].platformlevel = 3
                // alert('1')
            } else if (enemys1[i].top + 60 >= 700 - 10){
                enemys1[i].platformlevel = 0
                // alert()
            }

            if (enemys1[i].platformlevel + 1 == player.platformlevel && enemys1[i].moverandom == false) {
                // alert(enemys1[i].platformlevel)
                enemys1[i].enemysjumping =true
                // alert(enemys1[i].platformlevel)
                // alert(player.platformlevel)
                // alert("kdsfjgh")

            }
        }

    }


    for (i = 0;i < enemys2.length;i++) {
        if (enemys2[i].alive == true ) {
            // alert()
            if (enemys2[i].top + 60 <= 700 + 10 && enemys2[i].top + 60 >= 700 - 10) {
                // alert('3')

                enemys2[i].platformlevel = 1
            } else if (enemys2[i].top + 60 <= 540 + 10 && enemys2[i].top + 60 >= 540 - 10) {
                // alert('2')
                enemys2[i].platformlevel = 2
            } else if (enemys2[i].top + 60 <= 380 + 10) {


                enemys2[i].platformlevel = 3
                // alert('1')
            } else if (enemys2[i].top + 60 >= 700 - 10){
                enemys2[i].platformlevel = 0
                // alert()
            }

            if (enemys2[i].platformlevel + 1 == player.platformlevel && enemys2[i].moverandom == false) {
                enemys2[i].enemysjumping =true

            }
        }

    }



}

function enemysfallofplatforms() {
    for (i = 0; i <enemys1.length;i++) {
        if (enemys1[i].enemysjumping== false && enemys1[i].alive == true) {
            // alert('1')

            if (enemys1[i].top + 60 <= 700 + 10 && enemys1[i].top + 60 >= 700 - 10) {
                // alert('2')
                if (enemys1[i].left >= 0 && enemys1[i].left <= 210) {
                    // alert('3')
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false

                } else if (enemys1[i].left >= 510 + 40 && enemys1[i].left + 40 <= 690) {
                    // alert('3')
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false
                } else if (enemys1[i].left >= 990 && enemys1[i].left + 40 <= 1160) {
                    // alert('3')
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false
                } else if (enemys1[i].left >= 1460 && enemys1[i].left + 40 <= 1700) {
                    // alert('3')
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false
                }
            } else if (enemys1[i].top + 60 <= 540 + 10 && enemys1[i].top + 60 >= 540 - 10) {
                if (enemys1[i].left >= 0 && enemys1[i].left + 40 <= 450) {
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false
                } else if (enemys1[i].left >= 750 && enemys1[i].left + 40 <= 910) {
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false
                } else if (enemys1[i].left >= 1210 && enemys1[i].left + 40 <= 1700) {
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpup = false
                }
            } else if (enemys1[i].top + 60 <= 380 + 10 && enemys1[i].top + 60 >= 380 - 10) {
                if (enemys1[i].left >= 0 && enemys1[i].left + 40 <= 700) {
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemyjumpup = false
                } else if (enemys1[i].left >= 1000 && enemys1[i].left + 40 <= 1700) {
                    enemys1[i].enemysjumping = true
                    enemys1[i].enemyjumpdown = true
                    enemys1[i].enemyjumpup = false
                }
            }




        }
    }



    for (i = 0; i <enemys2.length;i++) {
        if (enemys2[i].enemysjumping== false && enemys2[i].alive == true) {
            // alert('1')

            if (enemys2[i].top + 60 <= 700 + 10 && enemys2[i].top + 60 >= 700 - 10) {
                // alert('2')
                if (enemys2[i].left >= 0 && enemys2[i].left <= 210) {
                    // alert('3')
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false

                } else if (enemys2[i].left >= 510 + 40 && enemys2[i].left + 40 <= 690) {
                    // alert('3')
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false
                } else if (enemys2[i].left >= 990 && enemys2[i].left + 40 <= 1160) {
                    // alert('3')
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false
                } else if (enemys2[i].left >= 1460 && enemys2[i].left + 40 <= 1700) {
                    // alert('3')
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false
                }
            } else if (enemys2[i].top + 60 <= 540 + 10 && enemys2[i].top + 60 >= 540 - 10) {
                if (enemys2[i].left >= 0 && enemys2[i].left + 40 <= 450) {
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false
                } else if (enemys2[i].left >= 750 && enemys2[i].left + 40 <= 910) {
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false
                } else if (enemys2[i].left >= 1210 && enemys2[i].left + 40 <= 1700) {
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpup = false
                }
            } else if (enemys2[i].top + 60 <= 380 + 10 && enemys2[i].top + 60 >= 380 - 10) {
                if (enemys2[i].left >= 0 && enemys2[i].left + 40 <= 700) {
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemyjumpup = false
                } else if (enemys2[i].left >= 1000 && enemys2[i].left + 40 <= 1700) {
                    enemys2[i].enemysjumping = true
                    enemys2[i].enemyjumpdown = true
                    enemys2[i].enemyjumpup = false
                }
            }




        }
    }



}




function enemyslandonplatforms() {
    for (i = 0; i < enemys1.length;i++) {
        if (enemys1[i].enemyjumpdown == true) {
            // alert('7')
            if (enemys1[i].top + 60 <= 700 + 10 && enemys1[i].top + 60 >= 700 - 10) {
                // alert('9')
                if (enemys1[i].left + 40 >= 210 && enemys1[i].left <= 510) {
                    // alert()
                    enemys1[i].top = 640
                    enemys1[i].enemyjumpdown = false


                } else if (enemys1[i].left + 40 >= 690 && enemys1[i].left <= 990) {
                    enemys1[i].top = 640
                    enemys1[i].enemyjumpdown = false
                    // alert()
                } else if (enemys1[i].left + 40 >= 1160 && enemys1[i].left <= 1460) {
                    enemys1[i].top = 640
                    enemys1[i].enemyjumpdown = false
                    // alert()
                }
            }

            if (enemys1[i].top + 60 <= 540 + 10 && enemys1[i].top + 60 >= 540 - 10) {
                if (enemys1[i].left + 40 >= 450 && enemys1[i].left <= 750) {
                    enemys1[i].top = 480
                    enemys1[i].enemyjumpdown = false

                }

                if (enemys1[i].left + 40 >= 910 && enemys1[i].left <= 1210) {
                    enemys1[i].top = 480
                    enemys1[i].enemyjumpdown = false

                }

            }

            if (enemys1[i].top + 60 <= 380 + 10 && enemys1[i].top + 60 >= 380 - 10) {
                if (enemys1[i].left + 40 >= 700 && enemys1[i].left <= 1000) {
                    enemys1[i].top = 320
                    enemys1[i].enemyjumpdown = false

                }

            }
        }


    }




    for (i = 0; i < enemys2.length;i++) {
        if (enemys2[i].enemyjumpdown == true) {
            // alert('7')
            if (enemys2[i].top + 60 <= 700 + 10 && enemys2[i].top + 60 >= 700 - 10) {
                // alert('9')
                if (enemys2[i].left + 40 >= 210 && enemys2[i].left <= 510) {
                    // alert()
                    enemys2[i].top = 640
                    enemys2[i].enemyjumpdown = false


                } else if (enemys2[i].left + 40 >= 690 && enemys2[i].left <= 990) {
                    enemys2[i].top = 640
                    enemys2[i].enemyjumpdown = false
                    // alert()
                } else if (enemys2[i].left + 40 >= 1160 && enemys2[i].left <= 1460) {
                    enemys2[i].top = 640
                    enemys2[i].enemyjumpdown = false
                    // alert()
                }
            }

            if (enemys2[i].top + 60 <= 540 + 10 && enemys2[i].top + 60 >= 540 - 10) {
                if (enemys2[i].left + 40 >= 450 && enemys2[i].left <= 750) {
                    enemys2[i].top = 480
                    enemys2[i].enemyjumpdown = false

                }

                if (enemys2[i].left + 40 >= 910 && enemys2[i].left <= 1210) {
                    enemys2[i].top = 480
                    enemys2[i].enemyjumpdown = false

                }

            }

            if (enemys2[i].top + 60 <= 380 + 10 && enemys2[i].top + 60 >= 380 - 10) {
                if (enemys2[i].left + 40 >= 700 && enemys2[i].left <= 1000) {
                    enemys2[i].top = 320
                    enemys2[i].enemyjumpdown = false

                }

            }
        }


    }

}


function enemysjump() {
    for (i = 0; i < enemys1.length;i++) {
        // alert()
        if (enemys1[i].enemysjumping == true) {
            // alert()
            if (enemys1[i].enemyjumped <= 170 && enemys1[i].enemyjumpup == true) {
                // alert("1")
                enemys1[i].top -= 10
                enemys1[i].enemyjumped += 10
                // jumpdown = true
                // alert(enemys1[i].enemyjumped)
            } else if ((enemys1[i].enemyjumpdown == true && enemys1[i].top <= 780) || enemys1[i].enemyjumped >= 30) {
                // enemyjumped >= 20
                enemys1[i].top += 10
                enemys1[i].enemyjumped -= 10
                enemys1[i].enemyjumpup = false
                enemys1[i].enemyjumpdown = true
                // alert(enemys1[i].enemyjumpdown)
            }
            else {
                // alert()
                enemys1[i].enemysjumping = false
                // document.getElementById("p3").innerHTML = x;
                enemys1[i].enemyjumpup = true
                enemys1[i].enemyjumped = 0
                enemys1[i].enemyjumpdown = false

            }


        }

    }



    for (i = 0; i < enemys2.length;i++) {
        // alert()
        if (enemys2[i].enemysjumping == true) {
            // alert()
            if (enemys2[i].enemyjumped <= 170 && enemys2[i].enemyjumpup == true) {
                // alert("1")
                enemys2[i].top -= 10
                enemys2[i].enemyjumped += 10
                // jumpdown = true
                // alert(enemys1[i].enemyjumped)
            } else if ((enemys2[i].enemyjumpdown == true && enemys2[i].top <= 780) || enemys2[i].enemyjumped >= 30) {
                // enemyjumped >= 20
                enemys2[i].top += 10
                enemys2[i].enemyjumped -= 10
                enemys2[i].enemyjumpup = false
                enemys2[i].enemyjumpdown = true
                // alert(enemys1[i].enemyjumpdown)
            }
            else {
                // alert()
                enemys2[i].enemysjumping = false
                // document.getElementById("p3").innerHTML = x;
                enemys2[i].enemyjumpup = true
                enemys2[i].enemyjumped = 0
                enemys2[i].enemyjumpdown = false

            }


        }

    }

}




var createImage = function(src, title,xcoord,ycoord,w,h,he,d,s,at) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    img.left = xcoord;
    img.top = ycoord;
    img.width = w;
    img.height = h;
    img.health  = he
    img.damage = d
    img.alive = false
    img.moverandom = true
    img.movespeed = s
    img.shooting = false
    img.direction  = ""
    img.attacktime = at
    img.directionchange=50
    img.platformlevel = 0
    img.enemysjumping = false
    img.enemyjumped = 0
    img.enemyjumpup = true
    img.enemyjumpdown = false




    return img;
};



$(document).keydown(function(event) {  //jQuery code to recognize a keydown event
    var keycode1 = (event.keyCode ? event.keyCode : event.which);

    if (keycode1 == 65) {
        right = true
        left  =false

    }

    if (keycode1 == 68) {
        right  =false
        left = true
    }

    if (keycode1 == 87) {
        jump = true

    }

    if (keycode1 == 32) {
        jump = true

    }

    if (keycode1 == 38) {
        shootup = true

    }

    if (keycode1 == 40 ) {
       shootdown = true

    }

    if (keycode1 == 37) {
        shootleft = true

    }

    if (keycode1 == 39) {
        shootright = true

    }
    if (keycode1 == 80){
        cheatcode()
    }
});


$(document).keyup(function(event) {  //jQuery code to recognize a keydown event
    var keycode2 = (event.keyCode ? event.keyCode : event.which);


    if (keycode2 == 65) {
        right  =false
    }
    if (keycode2 == 68) {
        left = false
    }



});



