// function compareNumeric(a, b) {
//     if (a > b) return 1;
//     if (a < b) return -1;
// }
// arr = ['2', '1', '16', ['df', 'df'], '95', '9']
// ar = []
// post_admin = {
//     reply_markup: JSON.stringify({
//         "inline_keyboard": [
//             [{ "text": "RU 33", "callback_data": "3_1" },
//             { "text": "RU 34", "callback_data": "3_2" }, { "text": "RU 3400", "callback_data": "3_2" }],
//             [{ "text": "RU 35", "callback_data": "3_3" },
//             { "text": "RU 36", "callback_data": "3_4" }],
//             [{ "text": "RU 37", "callback_data": "3_5" },
//             { "text": "RU 38 ", "callback_data": "3_6" }],
//             [{ "text": "RU 39", "callback_data": "3_7" },
//             { "text": "RU 40", "callback_data": "3_8" }],
//             [{ "text": "RU 41", "callback_data": "3_9" },
//             { "text": "RU 42", "callback_data": "3_10" }],
//             [{ "text": "RU 43", "callback_data": "3_11" }],
//             [{ "text": "➡️ Далее", "callback_data": "done_2" }],
//             [{ "text": "⬅️ Назад", "callback_data": "back_size" }]
//         ]
//     })
// };
// var pref = 'l ';
// var array = JSON.parse(post_admin.reply_markup).inline_keyboard

// // arr.map(item => 
// //     {
// //         if(typeof item == 'object'){
// //             item.map( item => console.log(item) )
// //         }else{
// //             console.log(item)
// //         }
// //     }
// //     )
// result = []

// var x = "3_10"
// array.map(item => {
//     if (typeof item == 'object') {
//         item.map(item => {
//             if (item.callback_data == x) {
//                 if (item.text.slice(0, 1) != pref.slice(0, 1)) {
//                     result.push(item.text)
//                     item.text = pref + item.text;
//                 } else {
//                     item.text = item.text.slice(2, 7);
//                     console.log(item.text.slice(2, 7))
//                     console.log(result.indexOf('3_10'))
//                     result = result.splice(result.indexOf(item.text.slice(2, 7)), 1)
//                 }
//             }
//         })
//     }
// }
// )
// //console.log(array)
// //console.log(result)

// post_admin = {
//     reply_markup: JSON.stringify({
//       "inline_keyboard": [[{ "text": "Премиум", "callback_data": "vip" }],
//       [{ "text": "Горячее", "callback_data": "hot" }],
//       [{ "text": "Опубликовать", "callback_data": "public" }],
//       [{ "text": "Отложить", "callback_data": "defer" }],
//       [{ "text": "Отменить", "callback_data": "cancel" }]
//       ]
//     }),
//     parse_mode: "HTML"
//   };

// var result = JSON.parse(post_admin.reply_markup).inline_keyboard


// var x = 'vip'
// result.map(item => {
//         item.map(item => {
//             if (item.callback_data == 'vip') { item.text = pref + item.text }
//         })
// })
// console.log(result)
// var x = 'vip'
// result.map(item => {
//         item.map(item => {
//             if (item.callback_data == 'vip') { item.text = item.text.slice(2, 20); }
//         })
// })

// console.log(result)


// lay_off = {
//     reply_markup: JSON.stringify({ "inline_keyboard": [[{ "text": "Уволить", "callback_data": "lay_off" }], [{ "text": "⬅️ Назад", "callback_data": "back_lay_off" }]] })
//   };

//   var inl = JSON.parse(lay_off.reply_markup).inline_keyboard
//   inl[0][0].callback_data = "lay_"+56464646564
//   console.log(inl)

//--------------------------------------------
arr = [38, 39, 40, 41, 42, 43, 45, 48]
arr2 = []
var obj = { i1: 0, i2: 0 }

mass = []
item = {}
var j = 0
obj.i1 = 38
for (i = 1; i < arr.length; i++) {
  if ((obj.i1 - arr[i]) / i != -1) {
    obj.i2 = arr[i - 1]
    arr2.push(obj)
    console.log(obj)
    var obj = { i1: arr[i], i2: 0 }
  }
}
console.log("----")
console.log(arr2)
for (i = 0; i < arr.length - 1; i++) {
  if (arr[i] - arr[i + 1] == -1) { arr2.push(i + 1) }
}

arr2.map(item => { arr[item] = 0 })

mass = [{ i1: 38, i2: 41 }, { i1: 45 }, { i1: 47 }, { i1: 49, i2: 52 }]

var text = "Размеры:"
mass.map(item => {
  text += `EU${item.i1}`
  if (item.i2) { text += `-${item.i2}` }
  text += ", "
})
text = text.slice(0, text.length - 1)
//console.log(text)
//--------------------------------------------
// var arr = Array(21).fill(0)
// console.log(arr)

// cross_size = ['36.5', '40', '42.5']
// EUWm = ["36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40", "40.5", "41", "41.5", "42", "42.5", "43"];
// var sizeW = Array(16).fill(0)

// cross_size.forEach(el => {
//   EUWm.forEach((el_2, i) => {
//     if (el == el_2) sizeW[i]++
//   })
// });

// console.log(sizeW)