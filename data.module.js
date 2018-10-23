module.exports.ref_but = {
  reply_markup: {
    inline_keyboard: [[{ text: "🌍 Поделиться в Telegram", switch_inline_query: "" }]]
  }
};
module.exports.photo = {
  url: "./IMG_3549.JPG",
  parse_mode: "HTML"
}
module.exports.varClOpt= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Антигравийная", "callback_data": "6_1","url":"https://medium.com/@savenko136t/%D0%B0%D0%BD%D1%82%D0%B8%D0%B3%D1%80%D0%B0%D0%B2%D0%B8%D0%B9%D0%BD%D0%B0%D1%8F-%D0%BF%D0%BB%D0%B5%D0%BD%D0%BA%D0%B0-8541e113878d" }],
    [{ "text": "Тонирование", "callback_data": "6_2","url":"https://medium.com/@savenko136t/%D1%82%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-2476e45d58d9" }],
    [{ "text": "Матовая", "callback_data": "6_3","url":"https://medium.com/@savenko136t/%D0%BE%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B0-%D0%BC%D0%B0%D1%82%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BF%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE%D0%B9-10beb605b7a4" }],
    [{ "text": "Глянцевая", "callback_data": "6_3","url":"https://medium.com/@savenko136t/%D0%BE%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B0-%D0%B3%D0%BB%D1%8F%D0%BD%D1%86%D0%B5%D0%B2%D0%BE%D0%B9-%D0%BF%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE%D0%B9-344c83505c57" }],
    [{ "text": "Хром/Золото", "callback_data": "6_3" ,"url":"https://medium.com/@savenko136t/%D0%BE%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B0-%D1%85%D1%80%D0%BE%D0%BC-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE-a741b79bcf96"}],
    [{ "text": "Винилография", "callback_data": "6_3","url":"https://medium.com/@savenko136t/%D0%B2%D0%B8%D0%BD%D0%B8%D0%BB%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F-e11d2e2d59c7" }],
    [{ "text": "Камуфляж/геометрия", "callback_data": "6_3","url":"https://medium.com/@savenko136t/%D0%BA%D0%B0%D0%BC%D1%83%D1%84%D0%BB%D1%8F%D0%B6-%D0%B3%D0%B5%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%8F-d64ce3d2ab8a" }],
    [{ "text": "Брендирование", "callback_data": "5_back","url":"https://medium.com/@savenko136t/%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-39283b6f85d2" }]]
  })
};
module.exports.procClOpt= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "next_step_1" }]]
  }),
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 1\n\nМойка кузова и обезжиривание спец.оборудованием"
};
module.exports.procClOpt_1= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "next_step_2" }]]
  }),
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 2\n\nПодготовка кузова к оклейке и частичная разборка"
};
module.exports.procClOpt_2= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "next_step_3" }]]
  }),
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 3\n\nОклейка автомобиля. Сборка и финальная полировка"
};
module.exports.procClOpt_3= {
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 4\n\nКонтрольная проверка через 7 дней. Выдаем гарантию"
};
module.exports.rss = 'Пришлите тест для рассылки \n\nМожно использовать разметку HTML'
module.exports.company = 'О компании'
module.exports.varCl = 'Варианты оклейки'
module.exports.start_text = '<b>Оклейка авто в Воронеже</b>\n\nВыделяемся из толпы правильно';
module.exports.start_text_admin = '<b>Панель администратора</b>';
module.exports.opt = {
  reply_markup: JSON.stringify({
    keyboard: [['🚙 О компании'],[{text:'📝 Бесплатная консультация', request_contact:true}],['🛠 Процесс оклейки', '🔰 Варианты оклейки'], ['Пригласи друга'], ['❓ Отвечаем на вопросы'],['📱 Контакты и адрес']],
    resize_keyboard: true
  }),
  parse_mode: "HTML"
};
module.exports.opt_admin = {
  reply_markup: JSON.stringify({
    keyboard: [['Рассылка'],['Статистика'],['Выгрузка базы']],
    resize_keyboard: true
  }),
  parse_mode: "HTML"
};
module.exports.contactOpt = {
  parse_mode: "HTML"
};
module.exports.contact = '<b>Контакты</b>\n\nТелефон: +7 930 400-77-08\nВКонтакте: vk.com/okleika.avto\nInstagram: inatagram.com/okleika.avto\n\n<b>Адрес:</b>\nг.Воронеж\nул. Проспект труда, д.46в\n"Детейлинг центр Restore FX"'

module.exports.chat = -256157570;
module.exports.link_bot = 'https://t.me/Dev_19999_Bot?start=';
module.exports.admin_root_id = 667183501;
module.exports.token = '660189538:AAHa24_ca1phApTBWT434HTiRbPH7bX8YIk';
module.exports.baseApiUrl = 'https://api.telegram.org';


module.exports.sale_text_2 = 'Приглашено друзей: ';
module.exports.sale_text_3 = '  Приглашай друзей и получай <b>cкидки</b>';

module.exports.post_free_admin = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [
      [{ "text": "Опубликовать", "callback_data": "publicPF" }],
      [{ "text": "Отложить", "callback_data": "deferPF" }],
      [{ "text": "Прикрепить картинку", "callback_data": "addPhotoPF" }],
      [{ "text": "Отменить", "callback_data": "cancelPF" }]
    ]
  }),
  parse_mode: "HTML"
};