const languages = ['en', 'ru', 'es'];
console.log(languages);

let header = [];
languages.forEach((language) => {
  header.push({'text': language, 'value': language});
});

console.log(header);