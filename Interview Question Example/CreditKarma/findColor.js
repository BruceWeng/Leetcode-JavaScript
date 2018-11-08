'use strict'

const colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]

function findColor(searchTerm, colors) {
  // Handle edge cases:
  // 1. empty inputs
  if (searchTerm === undefined || colors === undefined || colors.length === 0) return [];
  
  // 1. Brute Force: T: O(len(array) * maxlen(color)^2 * len(searchTerm))
  let result = [];
  for (let color of colors) { // O(len(array))
    let start = 0; // (inclusive)
    let i = 0;
    for (i = 0; i < searchTerm.length; i += 1) { // O(len(searchTerm))
      let nextStart = color.slice(start).indexOf(searchTerm[i]); // O(maxlen(color)^2)
      if ( nextStart === -1) break; // cannot find searchTerm[i] in color.slice(start)

      start = nextStart;
    }

    if (i === searchTerm.length) result.push(color);
  }
        
  return result;
}

// antiquewhite
// u q i
// i
// a n t i q u e w h i t e
//   s
// 
  
// console.log(findColor('ua', colors))

// console.log(findColor('uqi', colors))
// [ 'darkturquoise', 'mediumaquamarine', 'mediumturquoise', 'paleturquoise', 'turquoise' ]

// console.log(findColor('zre', colors))
// [ 'azure' ]

// console.log(findColor('gold', colors))
// [ 'darkgoldenrod', 'gold', 'goldenrod', 'lightgoldenrodyellow', 'palegoldenrod' ]



  // 2. map: {
  //      a: [aqu, a, aliceblue, antiquewhite..., maroon],
  //      b: [brown, black...],
  // .    u: [ua,
  // }
  // search: ua


  // 3. Trie Tree
  /*
               []
             /
            a
          /  \
         l    z
        /      \
       i        u
      /          \
     ...          r
                   \ 
     /              e
    e
   /
  null    
  */
 /**
  * Update with Color map
  * Still can not handle order problem
  */
 function ColorMap(color) { 
   let map = {};
   for (let c of color) { // O(maxlen(color))
     if (c in map) map[c] += 1;
     else map[c] = 1;
   }
   return {
     word: color,
     map // key: character, value: frequency
   }
 }
 // O(len(array) * maxlen(element))
 const findColor2 = (searchTerm, colors) => {
   if (searchTerm === undefined || colors === undefined || colors.length === 0) return [];
   
   let result = [];
   let colorMaps = [];
   for (let color of colors) { // O(n)
     let colorMap = ColorMap(color); // O(maxlen(color))
    //  console.log(colorMap);
     colorMaps.push(colorMap);
   }

   for (let colorMap of colorMaps) { // O(n)
     for (let c of searchTerm) { // O(len(searchTerm))
       if (!(c in colorMap.map)) break;
       else colorMap.map[c] -= 1;
     }
   }

   let remainingChar = 0;
   for (let colorMap of colorMaps) { // O(n)
     remainingChar = 0;
     for (let key in colorMap.map) { // O(# unique char in searchTerm)
       remainingChar += colorMap.map[key];
     }
     if (remainingChar === colorMap.word.length - searchTerm.length) result.push(colorMap.word);
   }

   return result;
 };

//  console.log(findColor2('ua', colors))

console.log(findColor2('uqi', colors))
// [ 'darkturquoise', 'mediumaquamarine', 'mediumturquoise', 'paleturquoise', 'turquoise' ]

console.log(findColor2('zre', colors))
// [ 'azure' ]

console.log(findColor2('gold', colors))
// [ 'darkgoldenrod', 'gold', 'goldenrod', 'lightgoldenrodyellow', 'palegoldenrod' ]