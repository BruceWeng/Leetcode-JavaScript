/**
 * 2019/11/23 Revisit
 */
const colors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]

/**
 * m: len(searchTerm)
 * n: len(color)
 * l: len(colors)
 * T: O(m*n*l)
 */
/**
 * 
 * @param {string} searchTerm 
 * @param {string[]} colors 
 */
function findColor(searchTerm, colors) {
  let result = [];
  for (let color of colors) {
    if (match(searchTerm, color)) result.push(color);
  }
  return result;
}

/**
 * 
 * @param {string} searchTerm 
 * @param {string} color 
 * @return {boolean}
 */
function match(searchTerm, color) {
  if (searchTerm.length > color.length) return false;

  let stIdx = 0;
  let colorIdx = 0;

  while (colorIdx < color.length) {
    if (stIdx === searchTerm.length) return true;
    if (searchTerm[stIdx] !== color[colorIdx]) {
      colorIdx += 1;
      continue;
    } else {
      colorIdx += 1;
      stIdx += 1;
    }
  }

  // finish iterate color, if stIdx === searchTerm.length: match; otherwise, not match
  return stIdx === searchTerm.length;
}

console.log(match('ua', 'aqua'));

console.log(findColor('ua', colors));
// [ 'aqua', 'aquamarine', 'fuchsia', 'mediumaquamarine', 'mediumseagreen', 'mediumslateblue' ]
console.log(findColor('uqi', colors));
// [ 'darkturquoise', 'mediumaquamarine', 'mediumturquoise', 'paleturquoise', 'turquoise' ]
console.log(findColor('zre', colors));
// [ 'azure' ]
