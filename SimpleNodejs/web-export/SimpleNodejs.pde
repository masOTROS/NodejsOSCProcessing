/**
 *    SimpleNodejs<br />
 *    <br />
 *    Created by Javier Velazquez Traut from <a href="http://masotros.com/" title="+OTROS">+OTROS</a>.
 */
 
 int number=0;
 String receivedString="";
 
 void setup(){
   size(500,200);
 }
 
 void draw(){
   background(255);
   fill(0);
   text(number++,10,100);
   text(receivedString,10,120);
 }
 
 void mousePressed(){
   send("This is a test message from the web-client. Number is: " + number + ".");
 }
 
 void receive(String s){
   receivedString=s;
 }

