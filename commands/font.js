const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

const fontMaps = [

  {
    name: 'cursive',
    map: {
      ' ': ' ',
      'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱',
      'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺',
      'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
      'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗',
      'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠',
      'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
    },
  },
{
name: 'artistic',
map: {
  ' ': ' ',
  'a': 'ꪖ', 'b': '᥇', 'c': 'ᥴ', 'd': 'ᦔ', 'e': 'ꫀ', 'f': 'ᠻ', 'g': 'ᧁ', 'h': 'ꫝ',
  'i': '𝓲', 'j': '𝓳', 'k': '𝘬', 'l': 'ꪶ', 'm': 'ꪑ', 'n': 'ꪀ', 'o': 'ꪮ', 'p': 'ρ', 'q': '𝘲',
  'r': '𝘳', 's': '𝘴', 't': '𝓽', 'u': 'ꪊ', 'v': 'ꪜ', 'w': '᭙', 'x': '᥊', 'y': 'ꪗ', 'z': 'ɀ',
  'A': 'ꪖ', 'B': '᥇', 'C': 'ᥴ', 'D': 'ᦔ', 'E': 'ꫀ', 'F': 'ᠻ', 'G': 'ᧁ', 'H': 'ꫝ',
  'I': '𝓲', 'J': '𝓳', 'K': '𝘬', 'L': 'ꪶ', 'M': 'ꪑ', 'N': 'ꪀ', 'O': 'ꪮ', 'P': 'ρ', 'Q': '𝘲',
  'R': '𝘳', 'S': '𝘴', 'T': '𝓽', 'U': 'ꪊ', 'V': 'ꪜ', 'W': '᭙', 'X': '᥊', 'Y': 'ꪗ', 'Z': 'ɀ',
},
},
{
  name: "runic",
  map: {
    " ": " ",
    "a": "ᚨ", "b": "ᛒ", "c": "ᚲ", "d": "ᛞ", "e": "ᛖ", "f": "ᚠ", "g": "ᚷ", "h": "ᚺ", "i": "ᛁ",
    "j": "ᛃ", "k": "ᚴ", "l": "ᛚ", "m": "ᛗ", "n": "ᚾ", "o": "ᛟ", "p": "ᛈ", "q": "ᚯ", "r": "ᚱ",
    "s": "ᛋ", "t": "ᛏ", "u": "ᚢ", "v": "ᚡ", "w": "ᚹ", "x": "ᛪ", "y": "ᚤ", "z": "ᛉ",
    "A": "ᚨ", "B": "ᛒ", "C": "ᚲ", "D": "ᛞ", "E": "ᛖ", "F": "ᚠ", "G": "ᚷ", "H": "ᚺ", "I": "ᛁ",
    "J": "ᛃ", "K": "ᚴ", "L": "ᛚ", "M": "ᛗ", "N": "ᚾ", "O": "ᛟ", "P": "ᛈ", "Q": "ᚯ", "R": "ᚱ",
    "S": "ᛋ", "T": "ᛏ", "U": "ᚢ", "V": "ᚡ", "W": "ᚹ", "X": "ᛪ", "Y": "ᚤ", "Z": "ᛉ"
  },
},
{
name: 'notes',
map: {
  ' ': ' ',
  'a': 'ᾰ', 'b': '♭', 'c': 'ḉ', 'd': 'ᖱ', 'e': 'ḙ', 'f': 'ḟ', 'g': '❡', 'h': 'ℏ',
  'i': '!', 'j': '♩', 'k': 'к', 'l': 'ℓ', 'm': 'Պ', 'n': 'ℵ', 'o': '✺', 'p': '℘', 'q': 'ǭ',
  'r': 'Ի', 's': 'ṧ', 't': 'т', 'u': 'ṳ', 'v': 'ṽ', 'w': 'ω', 'x': '✘', 'y': '⑂', 'z': 'ℨ',
  'A': 'ᾰ', 'B': '♭', 'C': 'ḉ', 'D': 'ᖱ', 'E': 'ḙ', 'F': 'ḟ', 'G': '❡', 'H': 'ℏ',
  'I': '!', 'J': '♩', 'K': 'к', 'L': 'ℓ', 'M': 'Պ', 'N': 'ℵ', 'O': '✺', 'P': '℘', 'Q': 'ǭ',
  'R': 'Ի', 'S': 'ṧ', 'T': 'т', 'U': 'ṳ', 'V': 'ṽ', 'W': 'ω', 'X': '✘', 'Y': '⑂', 'Z': 'ℨ',
},
},
{
name: 'birds',
map: {
  ' ': ' ',
  'A': 'A҈', 'B': 'B҈', 'C': 'C҈', 'D': 'D҈', 'E': 'E҈', 'F': 'F҈', 'G': 'G҈', 'H': 'H҈',
  'I': 'I҈', 'J': 'J҈', 'K': 'K҈', 'L': 'L҈', 'M': 'M҈', 'N': 'N҈', 'O': 'O҈', 'P': 'P҈',
  'Q': 'Q҈', 'R': 'R҈', 'S': 'S҈', 'T': 'T҈', 'U': 'U҈', 'V': 'V҈', 'W': 'W҈', 'X': 'X҈',
  'Y': 'Y҈', 'Z': 'Z҈', 'a': 'a҈', 'b': 'b҈', 'c': 'c҈', 'd': 'd҈', 'e': 'e҈', 'f': 'f҈',
  'g': 'g҈', 'h': 'h҈', 'i': 'i҈', 'j': 'j҈', 'k': 'k҈', 'l': 'l҈', 'm': 'm҈', 'n': 'n҈',
  'o': 'o҈', 'p': 'p҈', 'q': 'q҈', 'r': 'r҈', 's': 's҈', 't': 't҈', 'u': 'u҈', 'v': 'v҈',
  'w': 'w҈', 'x': 'x҈', 'y': 'y҈', 'z': 'z҈',
},
},
{
name: 'smallcaps',
map: {
  ' ': ' ',
  'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ',
  'I': 'ɪ', 'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ',
  'Q': 'ǫ', 'R': 'ʀ', 'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x',
  'Y': 'ʏ', 'Z': 'ᴢ', 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ',
  'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ',
  'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ',
  'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
},
},
{
name: 'bropella',
map: {
  ' ': ' ',
  'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧',
  'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯',
  'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷',
  'Y': '𝖸', 'Z': '𝖹', 'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿',
  'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇',
  'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏',
  'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
},
},
{
name: 'script',
map: {
  ' ': ' ',
  'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ',
  'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝',
  'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥',
  'y': '𝑦', 'z': '𝑧', 'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹',
  'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁',
  'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉',
  'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
},
},
{
name: 'scriptbold',
map: {
  ' ': ' ',
  'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉',
  'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒',
'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚',
'z': '𝒛', 'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮',
'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶',
'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾',
'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
},
},
{
name: 'sansitalic',
map: {
  ' ': ' ',
  'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪',
  'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳',
  's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
  'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐',
  'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙',
  'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
},
},
{
name: 'bolditalic',
map: {
  ' ': ' ',
  'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞',
  'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧',
  's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
  'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄',
  'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍',
  'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
},
},
  {
    name: 'comic',
    map: {
      ' ': ' ',
      'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙',
      'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢',
      'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
      'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ',
      'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ',
      'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
    },
  },
  {
    name: 'bold',
    map: {
      ' ': ' ',
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
      'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾',
      'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
      'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤',
      'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    },
  },
{
  name: 'italic',
  map: {
    ' ': ' ',
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ',
    'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞',
    'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼',
    'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅',
    'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
  },
},

  {
    name: 'fraktur',
    map: {
      ' ': ' ',
      'a': '𝔄', 'b': '𝔅', 'c': '𝔇', 'd': '𝔈', 'e': '𝔉', 'f': '𝔉', 'g': '𝔊', 'h': '𝔍',
      'i': '𝔎', 'j': '𝔏', 'k': '𝔐', 'l': '𝔏', 'm': '𝔑', 'n': '𝔒', 'o': '𝔒', 'p': '𝔓', 'q': '𝔔',
      'r': '𝔕', 's': '𝔖', 't': '𝔗', 'u': '𝔘', 'v': '𝔙', 'w': '𝔚', 'x': '𝔛', 'y': '𝔜', 'z': '𝔷',
      'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ',
      'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔',
      'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ',
    },
  },
  {
    name: 'sbd',
    map: {
      ' ': ' ',
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡',
      'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪',
      'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇',
      'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐',
      'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
    },
  },
  {
  name: 'monospace',
  map: {
    ' ': ' ',
    'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑',
    'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚',
    'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
    'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷',
    'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀',
    'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
  },
  },
{
  name: 'bubbles',
  map: {
    ' ': ' ',
    'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ',
    'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ',
    'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
    'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ',
    'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ',
    'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
  },
},
{
  "name": "morse",
  "map": {
    " ": " ",
    "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.", "h": "....",
    "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-",
    "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..",
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....",
    "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-",
    "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
    "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...",
    "8": "---..", "9": "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
    "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-", "\"": ".-..-.",
    "$": "...-..-", "@": ".--.-."
  },
},
{
  name: 'creepy',
  map: {
    ' ': ' ',
    'a': 'ค', 'b': '๒', 'c': 'ς', 'd': '๔', 'e': 'є', 'f': 'Ŧ', 'g': 'ﻮ', 'h': 'ђ',
    'i': 'เ', 'j': 'ן', 'k': 'қ', 'l': 'l', 'm': '๓', 'n': 'ภ', 'o': '๏', 'p': 'թ', 'q': 'ợ',
    'r': 'г', 's': 'ร', 't': 'Շ', 'u': 'ย', 'v': 'ש', 'w': 'ฬ', 'x': 'א', 'y': 'ץ', 'z': 'z',
    'A': 'ค', 'B': '๒', 'C': 'ς', 'D': '๔', 'E': 'є', 'F': 'Ŧ', 'G': 'ﻮ', 'H': 'ђ',
    'I': 'เ', 'J': 'ן', 'K': 'қ', 'L': 'l', 'M': '๓', 'N': 'ภ', 'O': '๏', 'P': 'թ', 'Q': 'ợ',
    'R': 'г', 'S': 'ร', 'T': 'Շ', 'U': 'ย', 'V': 'ש', 'W': 'ฬ', 'X': 'א', 'Y': 'ץ', 'Z': 'z',
  },
 },
{
  name: 'baybayin',
  map: {
    ' ': ' ',
    'a': 'ᜀ', 'b': 'ᜊ', 'c': 'ᜅ', 'd': 'ᜇ', 'e': 'ᜌ', 'f': 'ᜐ', 'g': 'ᜎ', 'h': 'ᜑ',
    'i': 'ᜊ', 'j': 'ᜌ', 'k': 'ᜃ', 'l': 'ᜋ', 'm': 'ᜋᜒ', 'n': 'ᜈ', 'o': 'ᜉ', 'p': 'ᜒ', 'q': 'ᜆ',
    'r': 'ᜐ', 's': 'ᜐ', 't': 'ᜆ', 'u': 'ᜑ', 'v': 'ᜈ', 'w': 'ᜏ', 'x': 'ᜐ', 'y': 'ᜌ', 'z': 'ᜃ',
    'A': 'ᜀ', 'B': 'ᜊ', 'C': 'ᜅ', 'D': 'ᜇ', 'E': 'ᜌ', 'F': 'ᜐ', 'G': 'ᜎ', 'H': 'ᜑ',
    'I': 'ᜊ', 'J': 'ᜌ', 'K': 'ᜃ', 'L': 'ᜋ', 'M': 'ᜋ', 'N': 'ᜈ', 'O': 'ᜉ', 'P': 'ᜒ', 'Q': 'ᜆ',
    'R': 'ᜐ', 'S': 'ᜐ', 'T': 'ᜆ', 'U': 'ᜑ', 'V': 'ᜈ', 'W': 'ᜏ', 'X': 'ᜐ', 'Y': 'ᜌ', 'Z': 'ᜃ',
  },
 },
{
  name: 'glitchy',
  map: {
    ' ': ' ',
    'a': 'ᗩ', 'b': 'β', 'c': 'ς', 'd': 'ᕧ', 'e': 'Ξ', 'f': 'ғ', 'g': 'ﾓ', 'h': '卄', 'i': '!!',
    'j': 'J', 'k': 'Ҡ', 'l': 'Ↄ', 'm': 'ᗰ', 'n': '几', 'o': 'Ө', 'p': 'Ԁ', 'q': 'Ҩ', 'r': '尺',
    's': '丂', 't': '千', 'u': 'ㄩ', 'v': 'ν', 'w': 'ω', 'x': '×', 'y': 'ү', 'z': '乙',
    'A': 'ᗩ', 'B': 'β', 'C': 'ς', 'D': 'ᕧ', 'E': 'Ξ', 'F': 'ғ', 'G': 'ﾓ', 'H': '卄', 'I': '!!',
    'J': 'J', 'K': 'Ҡ', 'L': 'Ↄ', 'M': 'ᗰ', 'N': '几', 'O': 'Ө', 'P': 'Ԁ', 'Q': 'Ҩ', 'R': '尺',
    'S': '丂', 'T': '千', 'U': 'ㄩ', 'V': 'ν', 'W': 'ω', 'X': '×', 'Y': 'ү', 'Z': '乙',
  },
},
{
  name: 'crossed',
  map: {
    'a': 'a̶', 'b': 'b̶', 'c': 'c̶', 'd': 'd̶', 'e': 'e̶', 'f': 'f̶', 'g': 'g̶', 'h': 'h̶',
    'i': 'i̶', 'j': 'j̶', 'k': 'k̶', 'l': 'l̶', 'm': 'm̶', 'n': 'n̶', 'o': 'o̶', 'p': 'p̶', 'q': 'q̶',
    'r': 'r̶', 's': 's̶', 't': 't̶', 'u': 'u̶', 'v': 'v̶', 'w': 'w̶', 'x': 'x̶', 'y': 'y̶', 'z': 'z̶',
    'A': 'A̶', 'B': 'B̶', 'C': 'C̶', 'D': 'D̶', 'E': 'E̶', 'F': 'F̶', 'G': 'G̶', 'H': 'H̶',
    'I': 'I̶', 'J': 'J̶', 'K': 'K̶', 'L': 'L̶', 'M': 'M̶', 'N': 'N̶', 'O': 'O̶', 'P': 'P̶', 'Q': 'Q̶',
    'R': 'R̶', 'S': 'S̶', 'T': 'T̶', 'U': 'U̶', 'V': 'V̶', 'W': 'W̶', 'X': 'X̶', 'Y': 'Y̶', 'Z': 'Z̶',
  },
},
{
  name: 'covered',
  map: {
    ' ': ' ',
    'a': 'a̺͆', 'b': 'b̺͆', 'c': 'c̺͆', 'd': 'd̺͆', 'e': 'e̺͆', 'f': 'f̺͆', 'g': 'g̺͆', 'h': 'h̺͆', 'i': 'i̺͆', 'j': 'j̺͆',
    'k': 'k̺͆', 'l': 'l̺͆', 'm': 'm̺͆', 'n': 'n̺͆', 'o': 'o̺͆', 'p': 'p̺͆', 'q': 'q̺͆', 'r': 'r̺͆', 's': 's̺͆', 't': 't̺͆',
    'u': 'u̺͆', 'v': 'v̺͆', 'w': 'w̺͆', 'x': 'x̺͆', 'y': 'y̺͆', 'z': 'z̺͆',

    'A': 'A̺͆', 'B': 'B̺͆', 'C': 'C̺͆', 'D': 'D̺͆', 'E': 'E̺͆', 'F': 'F̺͆', 'G': 'G̺͆', 'H': 'H̺͆', 'I': 'I̺͆', 'J': 'J̺͆',
    'K': 'K̺͆', 'L': 'L̺͆', 'M': 'M̺͆', 'N': 'N̺͆', 'O': 'O̺͆', 'P': 'P̺͆', 'Q': 'Q̺͆', 'R': 'R̺͆', 'S': 'S̺͆', 'T': 'T̺͆',
    'U': 'U̺͆', 'V': 'V̺͆', 'W': 'W̺͆', 'X': 'X̺͆', 'Y': 'Y̺͆', 'Z': 'Z̺͆',
  },
},
{
  name: 'reverse',
  map: {
    ' ': ' ',
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ',
    'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
    's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
    'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I',
    'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ',
    'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
  },
},
{
  name: 'smiley',
  map: {
    ' ': ' ',
    'A': 'Ă̈', 'B': 'B̆̈', 'C': 'C̆̈', 'D': 'D̆̈', 'E': 'Ĕ̈', 'F': 'F̆̈', 'G': 'Ğ̈', 'H': 'H̆̈', 'I': 'Ĭ̈', 'J': 'J̆̈',
    'K': 'K̆̈', 'L': 'L̆̈', 'M': 'M̆̈', 'N': 'N̆̈', 'O': 'Ŏ̈', 'P': 'P̆̈', 'Q': 'Q̆̈', 'R': 'R̆̈', 'S': 'S̆̈', 'T': 'T̆̈',
    'U': 'Ŭ̈', 'V': 'V̆̈', 'W': 'W̆̈', 'X': 'X̆̈', 'Y': 'Y̆̈', 'Z': 'Z̆̈',

    'a': 'ă̈', 'b': 'b̆̈', 'c': 'c̆̈', 'd': 'd̆̈', 'e': 'ĕ̈', 'f': 'f̆̈', 'g': 'ğ̈', 'h': 'h̆̈', 'i': 'ĭ̈', 'j': 'j̆̈',
    'k': 'k̆̈', 'l': 'l̆̈', 'm': 'm̆̈', 'n': 'n̆̈', 'o': 'ŏ̈', 'p': 'p̆̈', 'q': 'q̆̈', 'r': 'r̆̈', 's': 's̆̈', 't': 't̆̈',
    'u': 'ŭ̈', 'v': 'v̆̈', 'w': 'w̆̈', 'x': 'x̆̈', 'y': 'y̆̈', 'z': 'z̆̈',
  },
},
{
  name: 'boxed',
  map: {
    'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹',
    'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃',
    'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉',
    'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶', 'H': '🄷', 'I': '🄸', 'J': '🄹',
    'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃',
    'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉',
  },
},
{
  name: 'clouds',
  map: {
    ' ': ' ',
    'a': 'a͜͡', 'b': 'b͜͡', 'c': 'c͜͡', 'd': 'd͜͡', 'e': 'e͜͡', 'f': 'f͜͡', 'g': 'g͜͡', 'h': 'h͜͡', 'i': 'i͜͡',
    'j': 'j͜͡', 'k': 'k͜͡', 'l': 'l͜͡', 'm': 'm͜͡', 'n': 'n͜͡', 'o': 'o͜͡', 'p': 'p͜͡', 'q': 'q͜͡', 'r': 'r͜͡',
    's': 's͜͡', 't': 't͜͡', 'u': 'u͜͡', 'v': 'v͜͡', 'w': 'w͜͡', 'x': 'x͜͡', 'y': 'y͜͡', 'z': 'z͜͡',
    'A': 'A͜͡', 'B': 'B͜͡', 'C': 'C͜͡', 'D': 'D͜͡', 'E': 'E͜͡', 'F': 'F͜͡', 'G': 'G͜͡', 'H': 'H͜͡', 'I': 'I͜͡',
    'J': 'J͜͡', 'K': 'K͜͡', 'L': 'L͜͡', 'M': 'M͜͡', 'N': 'N͜͡', 'O': 'O͜͡', 'P': 'P͜͡', 'Q': 'Q͜͡', 'R': 'R͜͡',
    'S': 'S͜͡', 'T': 'T͜͡', 'U': 'U͜͡', 'V': 'V͜͡', 'W': 'W͜͡', 'X': 'X͜͡', 'Y': 'Y͜͡', 'Z': 'Z͜͡',
  },
},
{
  name: 'tiny',
  map: {
    ' ': ' ',
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ',
    'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ',
    's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
    'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ',
    'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ᴿ',
    'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
  },
},
{
  name: 'lightshade',
  map: {
    ' ': ' ',
    'a': 'a░', 'b': 'b░', 'c': 'c░', 'd': 'd░', 'e': 'e░', 'f': 'f░', 'g': 'g░', 'h': 'h░', 'i': 'i░',
    'j': 'j░', 'k': 'k░', 'l': 'l░', 'm': 'm░', 'n': 'n░', 'o': 'o░', 'p': 'p░', 'q': 'q░', 'r': 'r░',
    's': 's░', 't': 't░', 'u': 'u░', 'v': 'v░', 'w': 'w░', 'x': 'x░', 'y': 'y░', 'z': 'z░',
    'A': 'A░', 'B': 'B░', 'C': 'C░', 'D': 'D░', 'E': 'E░', 'F': 'F░', 'G': 'G░', 'H': 'H░', 'I': 'I░',
    'J': 'J░', 'K': 'K░', 'L': 'L░', 'M': 'M░', 'N': 'N░', 'O': 'O░', 'P': 'P░', 'Q': 'Q░', 'R': 'R░',
    'S': 'S░', 'T': 'T░', 'U': 'U░', 'V': 'V░', 'W': 'W░', 'X': 'X░', 'Y': 'Y░', 'Z': 'Z░',
  },
},
  // Add more fonts as needed
];

module.exports = {
  name: 'font',
  description: 'Convert text to different fonts',
  usage: '-font <font name> <text>',
  author: 'Coffee',
  async execute(senderId, args) {
    const pageAccessToken = token;

    if (!args || !Array.isArray(args) || args.length === 0) {
      await sendMessage(senderId, { text: '・──── >ᴗ< ────・\nPlease provide a font type and message.\nExample: -font fancy Hello!\n\nTo see the list of font types\nchat -font list.\n・───────────・' }, pageAccessToken);
      return;
    }

    const command = args[0].toLowerCase();

    // Font listing feature
    if (command === 'list') {
      const exampleText = 'Hello';
      const header = '═「𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐅𝐨𝐧𝐭𝐬 」═\n\n 𝑭𝒐𝒏𝒕 𝑵𝒂𝒎𝒆     𝑺𝒂𝒎𝒑𝒍𝒆';
      const maxFontNameLength = Math.max(...fontMaps.map(fontMap => fontMap.name.length));

      const availableFontsList = fontMaps.map((fontMap) => {
        const exampleChar = exampleText.split('')
          .map((char) => fontMap.map[char] || char)
          .join('');

        const formattedFontName = `★ ${fontMap.name.padEnd(maxFontNameLength)}`;
        const padding = ' '.repeat(maxFontNameLength - fontMap.name.length);

        return `${formattedFontName}${padding}     ${exampleChar}`;
      }).join('\n');

      const message = `${header}\n\n${availableFontsList}`;
      await sendMessage(senderId, { text: message }, pageAccessToken);
      return;
    }

    if (args.length < 2) {
      await sendMessage(senderId, { text: 'Invalid usage. Please provide a font type and message.\nExample: -font fancy Hello!\nUse -font list to see available fonts.' }, pageAccessToken);
      return;
    }

    const fontType = args.shift().toLowerCase();
    const inputText = args.join(' ');

    const chosenFontMap = fontMaps.find((fontMap) => fontMap.name === fontType);

    if (!chosenFontMap) {
      const availableFonts = fontMaps.map((fontMap) => `★ ${fontMap.name}`).join('\n');
      await sendMessage(senderId, { text: `Invalid font type. Available fonts:\n${availableFonts}` }, pageAccessToken);
      return;
    }

    const outputText = inputText
      .split('')
      .map((char) => chosenFontMap.map[char] || char)
      .join('');

    const formattedMessage = `${outputText}`;

    try {
      await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      await sendMessage(senderId, { text: 'Error: Unexpected error.' }, pageAccessToken);
    }
  }
};