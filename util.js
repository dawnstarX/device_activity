const tags=["VOLTS1","VOLTS2","VOLTS3","CUR1","CUR2","CUR3","W1","W2","W3","PF1","PF2","PF3","MDKW","ACTIVE","REACTIVE","FREQ"]

function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit); 
  }

function getRandomTag(){
    let length=tags.length;
    return tags[getRandomNumber(length)];
}
  
  module.exports = {
        getRandomNumber,
        getRandomTag,
  }