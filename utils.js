'use strict';

var stopword = ['el','la','los','les','las','de','del','a','ante','con','en','para','por','y','o','u','tu','te','ti','le','que','al','ha','un','han','lo','su','una','estas','esto','este','es','tras','suya','a','acá','ahí','al','algo','algún','alguna','algunas','alguno','algunos','allá','alli','allí','ambos','ante','antes','aquel','aquella','aquellas','aquello','aquellos','aqui','aquí','arriba','asi','atras','aun','aunque','bastante','bien','cabe','cada','casi','cierta','ciertas','cierto','ciertos','como','cómo','con','conmigo','conseguimos','conseguir','consigo','consigue','consiguen','consigues','contigo','contra','cual','cuales','cualquier','cualquiera','cualquieras','cuancuán','cuando','cuanta','cuánta','cuantas','cuántas','cuanto','cuánto','cuantos','cuántos','de','dejar','del','demás','demas','demasiada','demasiadas','demasiado','demasiados','dentro','desde','donde','dos','el','él','ella','ellas','ello','ellos','empleais','emplean','emplear','empleas','en','encima','entonces','entre','era','eramos','eran','eras','eres','es','esa','esas','ese','eso','esos','esta','estaba','estado','estais','estamos','estan','estar','estas','este','esto','estos','estoy','etc','fin','fue','fueron','fui','fuimos','ha','hace','haceis','hacemos','hacen','hacer','haces','hacia','hago','hasta','incluso','intenta','intentais','intentamos','intentan','intentar','intentas','intento','ir','jamás','junto','juntos','la','largo','las','lo','los','mas','más','me','menos','mi','mía','mia','mias','mientras','mio','mío','mios','mis','misma','mismas','mismo','mismos','modo','mucha','muchas','muchísima','muchísimas','muchísimo','muchísimos','mucho','muchos','muy','nada','ni','ningun','ninguna','ningunas','ninguno','ningunos','no','nos','nosotras','nosotros','nuestra','nuestras','nuestro','nuestros','nunca','os','otra','otras','otro','otros','para','parecer','pero','poca','pocas','poco','pocos','podeis','podemos','poder','podria','podriais','podriamos','podrian','podrias','por','por','qué','porque','primero','primero','desde','puede','pueden','puedo','pues','que','qué','querer','quien','quién','quienes','quienes','quiera','quienquiera','quiza','quizas','sabe','sabeis','sabemos','saben','saber','sabes','se','segun','ser','si','sí','siempre','siendo','sin','sín','sino','so','sobre','sois','solamente','solo','somos','soy','sr','sra','sres','esta','su','sus','suya','suyas','suyo','suyos','tal','tales','también','tambien','tampoco','tan','tanta','tantas','tanto','tantos','te','teneis','tenemos','tener','tengo','ti','tiempo','tiene','tienen','toda','todas','todo','todos','tomar','trabaja','trabajais','trabajamos','trabajan','trabajar','trabajas','tras','tú','tu','tus','tuya','tuyo','tuyos','ultimo','un','una','unas','uno','unos','usa','usais','usamos','usan','usar','usas','uso','usted','ustedes','va','vais','valor','vamos','van','varias','varios','vaya','verdad','verdadera','vosotras','vosotros','voy','vuestra','vuestras','vuestro','vuestros','y','ya','yo','como','cómo','hacer','se','tengo','algun','verdadero','sido','son']
var articles = {"el" : "choto", "la" : "chota", "los" : "chotos", "las" : "chotas", "un" : "choto", "una" : "chota", "suya" : "chota", "alguna" : "chota", "algunas" : "chotas", "algun" : "choto", "algunos" : "chotos", "aquella" : "chota", "aquellas" : "chotas", "aquello" : "choto", "aquellos" : "chotos", "del" : "choto" }
var validWord = /[A-Za-záéíóúÁÉÍÓÚñÑàèìòùÀÈÌÒÙ]+/; // regexp used for check that the candidate word to be replaced it is not a symbol

var isStopWord = (word) => {
    return stopword.indexOf(word) != -1;
};

var getChotaFromArticle = (word) => {
    let key = Object.keys(articles).find((k) => {return k == word.toLowerCase()})
    return articles[key];
};

var isArticle = (word) => {
    let article = getChotaFromArticle(word)
    return (article) ? true : false;
};

var findChotoGender = (titleWords, wordIndex) => {
    if(wordIndex < 0) { return "chota" }
    if(isArticle(titleWords[wordIndex])) {
        return getChotaFromArticle(titleWords[wordIndex])
    } else {
        return findChotoGender(titleWords, wordIndex - 1)
    }
};

var changeRandom = (title) => {
    let found = false;
    let titleWords = title.split(" ");
    let result;
    do {
        let wordIndex = random(0, titleWords.length - 1);
        if(!isStopWord(titleWords[wordIndex].toLowerCase()) && validWord.test(titleWords[wordIndex])) {
            found = true;
            titleWords[wordIndex] = replace(titleWords[wordIndex], findChotoGender(titleWords, wordIndex - 1));
            console.log(`Resonding /chota ${title} with : ${titleWords.join(" ")}`);
            result = titleWords.join(" ");
        }
    } while(!found);
    return result;
};

var random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

var replace = (word, withWord) => {
    return word.replace(validWord, withWord);
};

module.exports = {
    isStopWord : isStopWord,
    isArticle : isArticle,
    findChotoGender : findChotoGender,
    random : random,
    replace : replace,
    validWordRegExp : validWord,
    changeRandom : changeRandom
};