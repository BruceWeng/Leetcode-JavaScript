'use strict'

const colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]

function findColor(searchTerm, colors) {
  // Handle edge cases:
  // 1. empty inputs
  if (searchTerm === undefined || colors === undefined || colors.length === 0) return [];
  
  // 1. Brute Force: T: O(len(array) * max*len(element) * len(searchString))
  let result = [];
  for (let color of colors) {
    let start = 0; // (inclusive)
    let i = 0;
    for (i = 0; i < searchTerm.length; i += 1) {
      if (!color.slice(start).includes(searchTerm[i])) break;

      start = color.indexOf(searchTerm[i]);
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
  
console.log(findColor('ua', colors))

console.log(findColor('uqi', colors))
// [ 'darkturquoise', 'mediumaquamarine', 'mediumturquoise', 'paleturquoise', 'turquoise' ]

console.log(findColor('zre', colors))
// [ 'azure' ]

console.log(findColor('gold', colors))
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