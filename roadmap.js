'use strict';
const stages = [
  {name:'Редакционная основа', short:'Что считаем ценной темой', status:'ЧАСТИЧНО ЕСТЬ', owner:'Ярослав готовит; Лео согласует ориентир один раз.',
    why:'Задать общий вкус Радара: интерес аудитории плюс содержательность CRYPTUS, а не просто популярный заголовок.',
    tasks:['Выделить редакционное ядро опубликованных постов CRYPTUS и отделить рекламные интеграции.','Собрать разнообразные ориентиры: вопрос читателя, нужная информация, польза и границы.','Зафиксировать основу: крипта, денежные темы со связью с криптой, отдельный полезный AI.'],
    output:'Редакционная политика и компактная база положительных примеров. Новые сильные сюжеты тоже допускаются, даже если аналога в архиве нет.',
    dependency:'Политика используется в поиске, отборе, исследовании и авторской сущности. Затем — единый исходник.', cost:'Существующий архив уже загружен; новая подписка для базы не требуется.'},
  {name:'Единый исходный материал', short:'Текст, автор, дата, источник', status:'ДОРАБОТКА ОСНОВЫ', owner:'Ярослав / техническая реализация Радара.',
    why:'Независимо от сервиса каждая находка должна попадать в одну понятную структуру и сохранять свой контекст.',
    tasks:['Сохранять оригинальный текст, ссылки, автора, дату и доступные связанные фрагменты.','Разделять полный материал, частичный материал и пересказ.','Объединять пересказы одного события; новое развитие хранить как обновление, а не ещё один независимый сюжет.'],
    output:'Одна карточка события с исходниками и историей изменений. Её понимают Радар, исследователь и автор Лео.',
    dependency:'На этой структуре строятся все новые источники и передача автору. Следом — общий бюджет.', cost:'Переработка имеющегося контура, без обязательного нового сервера.'},
  {name:'Бюджет и автономная работа', short:'Не терять задачи и деньги', status:'УЧЁТ ЕСТЬ, КОНТУР РАСШИРЯЕМ', owner:'Ярослав; изменение расходов согласуется с владельцем.',
    why:'Один конвейер должен понимать, сколько уже потрачено, что продолжается и когда нужно остановиться.',
    tasks:['Разделить деньги на сбор, оценку, дополнительные факты и создание контента.','Переиспользовать существующий журнал расходов и продолжение незавершённых задач.','Предусмотреть остановку при нехватке бюджета и понятное сообщение о проблеме.'],
    output:'Согласованные лимиты и наблюдаемый рабочий цикл без повторной оплаты одной задачи.',
    dependency:'Перед реальными расширенными сборами и research. Дальше — подключение площадок.', cost:'Целевой Grok до $25, Apify Free; Gemini/Perplexity используем из имеющихся возможностей Лео.'},
  {name:'Сбор из разных площадок', short:'X, Reddit, YouTube и публикации', status:'НОВАЯ СВЯЗКА СЕРВИСОВ', owner:'Ярослав — Радар; Лео — интерфейс своих Gemini/Perplexity.',
    why:'Находить интересные единицы информации до того, как они превратились в одинаковые новости на всех каналах.',
    tasks:['Grok ищет Twitter по авторам и тематическим запросам; Apify собирает Reddit.','Gemini разбирает выбранные YouTube-видео и подкасты; блоги и документы добавляют прямые исходники.','Вести расширяемый список источников. Наблюдения людей и публикации проектов — параллельные входы.'],
    output:'Единая очередь материалов разных форматов с известным происхождением.',
    dependency:'Затем сравниваем реальный интерес и полезность, не отправляем всё подряд в дорогой research.', cost:'Сбор ограничен общим объёмом. Новый канал не получает автоматически отдельный безлимитный бюджет.'},
  {name:'Отсев по интересу', short:'Что действительно цепляет людей', status:'УЛУЧШЕНИЕ ОТБОРА', owner:'Ярослав / Grok-оценщик по общей политике.',
    why:'Найти «альфу»: информацию, которую хочется понять, обсудить, сохранить или передать другому.',
    tasks:['Учитывать отклик относительно обычного уровня автора, канала, формата и возраста материала.','Разделить интерес широкой площадки и соответствие именно читателю CRYPTUS.','Оставить место ранним полезным находкам, у которых ещё нет большого отклика.'],
    output:'Приоритетная очередь с объяснением: чем интересна тема, какую пользу даёт и насколько это подтверждено.',
    dependency:'После сбора и редакционной политики. Дальше формируем разные, а не повторяющиеся темы.', cost:'Оценка входит в Grok. Исторические данные для сравнения — отдельная начальная настройка.'},
  {name:'Короткий список сильных тем', short:'Содержание вместо заполнения квоты', status:'РАСШИРЯЕМ ТЕКУЩИЙ SHORTLIST', owner:'Ярослав / Радар.',
    why:'Из сотен находок выбрать небольшой запас содержательных событий, из которых получится около 10 пригодных пакетов.',
    tasks:['Отсеивать повторы, рекламу без редакционной ценности и поверхностные пересказы.','Сохранять разнообразие вопросов и источников, не заполнять выдачу одним активным автором.','Направлять в исследование только перспективные темы с конкретными пробелами.'],
    output:'До 20 серьёзных событий для подготовки 10 пакетов; это предлагаемая мощность, не обещание 50% выхода.',
    dependency:'Дальше — дополнительные факты и целостная картина темы.', cost:'Глубокая обработка оплачивается только для выбранных событий, а не для всей сырой очереди.'},
  {name:'Исследование и дополнение', short:'Perplexity собирает целую картину', status:'АВТОМАТИЗИРУЕМ ОБОГАЩЕНИЕ', owner:'Ярослав — постановка задачи; исследовательский сервис Лео — выполнение.',
    why:'Сделать основу сильнее исходного поста: объяснить механизм, дать контекст и раскрыть важный вопрос.',
    tasks:['Искать подтверждения центральных фактов, а также подходящие исследования и неожиданные полезные связи.','Сначала использовать уже доступные ссылки; внешний поиск — по конкретному недостающему вопросу.','Предпочтительно передавать задачи существующему Perplexity-боту Лео; Grok оставлять альтернативой.'],
    output:'Подборка прочитанных источников и тезисов: что подтверждено, что объясняет механизм, где остаётся неизвестность.',
    dependency:'После короткого списка; затем — финальная проверка и разрешённые формулировки.', cost:'Не покупаем новые подписки по умолчанию. Лимиты и дополнительное потребление имеющегося пути уточняются.'},
  {name:'Готовый пакет фактуры', short:'Можно передавать автору', status:'НОВЫЙ АВТОНОМНЫЙ ВЫХОД', owner:'Радар / общий проверяющий.',
    why:'Не передать автору уверенную выдумку, неполный контекст или неподтверждённую причину события.',
    tasks:['Связать главные утверждения с прочитанными основаниями и сохранить важные ограничения.','Отделить факт от мнения, обещания и объясняющей гипотезы.','Подготовить один пакет: исходник, суть, интерес, фактура, дополнительные источники и возможные форматы.'],
    output:'Пакет, по которому можно писать без нового ручного расследования. Неподтверждённые темы остаются вне готовой выдачи.',
    dependency:'Единый вход для автора Лео, независимо от площадки и поискового сервиса.', cost:'Финальная обработка входит в модельный бюджет Радара.'},
  {name:'Передача и выбор формата', short:'Текст, карточки или видео', status:'СОГЛАСОВЫВАЕМ С ЛЕО', owner:'Совместно: Радар передаёт, сущность Лео принимает.',
    why:'Одна сильная тема может лучше работать как разбор, карточки или короткий фрагмент из подкаста.',
    tasks:['Согласовать формат получения пакета и ответа автора.','Передавать рекомендации по формату, а для видео — нужный фрагмент и контекст.','Сохранять связь события, версии пакета и созданного материала.'],
    output:'Авторская очередь без ручного копирования ссылок. 10 тем остаются 10 темами, даже если некоторые получат несколько форматов.',
    dependency:'Затем Лео создаёт материал; обратный ответ связывает его с исходной темой.', cost:'Интеграция отдельно от стоимости написания и монтажа.'},
  {name:'Создание на стороне Лео', short:'Из фактуры — в публикацию', status:'ЗОНА ЛЕО', owner:'Лео / его авторская сущность и инструменты.',
    why:'Превратить достоверную основу в цепляющий материал в стиле CRYPTUS без ежедневного редактора.',
    tasks:['Написать аналитический текст, собрать карточки или сценарий/фрагмент видео.','Сохранить смысл источников и ограничения при сильной подаче.','Вернуть созданный материал, его формат и связь с пакетом Радара.'],
    output:'Материал, готовый к согласованному режиму публикации. Модель автора и техническую реализацию выбирает Лео.',
    dependency:'После приёма пакета. Дальше — выпуск и сбор результата.', cost:'Не входит в Grok $25: автор, изображения, озвучка и монтаж считаются на стороне Лео.'},
  {name:'Запуск полного цикла', short:'От находки до опубликованного материала', status:'ПОСЛЕ СБОРКИ ИНТЕГРАЦИЙ', owner:'Совместный запуск; права публикации определяются отдельно.',
    why:'Включить связку как единый процесс, а не набор отдельных кнопок и ручных пересылок.',
    tasks:['Сначала провести ограниченный рабочий пилот, затем перейти к согласованному расписанию.','Связать публикацию с темой и выбранным форматом.','Оставить понятную остановку и уведомление при недоступности сервиса, нехватке фактуры или бюджета.'],
    output:'Рабочий цикл без ежедневного отбора редактором. Режим автопубликации включается отдельным решением.',
    dependency:'После готовности Радара и автора. Далее — накопление результатов аудитории.', cost:'Фактическую цену уточняем по потреблению всего цикла; не обещаем полный комбайн за $25.'},
  {name:'Замер и улучшение', short:'Результаты возвращаются в отбор', status:'ПОСЛЕ ПЕРВЫХ ПУБЛИКАЦИЙ', owner:'Радар + статистика публикаций; Лео возвращает формат/результат.',
    why:'Искать больше того, что действительно нравится нашей аудитории, а не обучаться на собственных оценках модели.',
    tasks:['Сравнивать результаты в одинаковом возрасте публикации и отдельно по форматам.','Связывать тему, подачу и результат; учитывать не только просмотры, но и доступные реакции/распространение.','Постепенно корректировать приоритеты тем и источников, сохраняя редакционную планку.'],
    output:'Обратная связь для следующей недели. Это обновление правил и ориентиров, не обучение новой модели с нуля.',
    dependency:'Цикл замыкается на поиск и оценку. Одного удачного поста недостаточно для радикальной смены стратегии.', cost:'Сбор метрик и хранение — отдельная часть эксплуатации; сначала используем существующую статистику.'}
];
const cases = {
  hype:{title:'Много лайков, но только обещание роста',text:'Популярный пост обещает взлёт токена и ведёт на реферальную ссылку. В нём нет проверяемого механизма или самостоятельной пользы.',verdict:'Не пропускаем за популярность. Реклама и неподтверждённые обещания не становятся темой автоматически.'},
  early:{title:'Пользователи заметили проблему раньше команды',text:'Есть исходные наблюдения и доступные подтверждения отдельных неудачных операций. Официального заявления пока нет, массовость не установлена.',verdict:'Исследуем узкий подтверждаемый факт. Не называем это взломом или неплатёжеспособностью без оснований.'},
  useful:{title:'Разбор объясняет, кто платит за криптопродукт',text:'Оригинальный материал раскрывает комиссии, стимулы и ограничения. Есть проверяемые данные, а аудитория задаёт содержательные вопросы.',verdict:'Перспективный кандидат. Добавляем недостающий контекст и проверяем фактуру до передачи автору.'}
};
const $ = id => document.getElementById(id);
let activeStage = 0;
const phaseNames = ['Основа', 'Поиск и интерес', 'Факты и передача', 'Полный цикл'];
function buildJourney() {
  $('stage-buttons').replaceChildren(...phaseNames.map((name, phase) => {
    const row = document.createElement('div'); row.className = 'journey-row';
    const heading = document.createElement('button'); heading.type = 'button';
    heading.className = 'journey-phase'; heading.dataset.phase = String(phase);
    heading.textContent = `${String(phase + 1).padStart(2, '0')} / ${name}`;
    heading.addEventListener('click', () => renderStage(phase * 3, true));
    const nodes = document.createElement('div'); nodes.className = 'journey-nodes';
    stages.slice(phase * 3, phase * 3 + 3).forEach((stage, offset) => {
      const index = phase * 3 + offset, button = document.createElement('button');
      button.type = 'button'; button.className = 'journey-node'; button.dataset.stage = String(index);
      button.setAttribute('aria-controls', 'stage-detail');
      button.style.gridColumn = String(phase % 2 ? 3 - offset : offset + 1); button.style.gridRow = '1';
      const number = document.createElement('span'); number.className = 'journey-number'; number.textContent = String(index + 1).padStart(2, '0');
      const title = document.createElement('span'); title.className = 'journey-name'; title.textContent = stage.name;
      const short = document.createElement('small'); short.textContent = stage.short;
      button.append(number, title, short); button.addEventListener('click', () => renderStage(index, true)); nodes.append(button);
    });
    row.append(heading, nodes); return row;
  }));
}
function drawJourney() {
  const map = $('journey-map'), svg = $('journey-links'), box = map.getBoundingClientRect();
  if (!box.width) return;
  svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
  const ns = 'http://www.w3.org/2000/svg', defs = document.createElementNS(ns, 'defs'), marker = document.createElementNS(ns, 'marker');
  marker.id = 'journey-arrow';
  for (const [key,value] of Object.entries({viewBox:'0 0 8 8',refX:'7',refY:'4',markerWidth:'7',markerHeight:'7',orient:'auto'})) marker.setAttribute(key,value);
  const tip = document.createElementNS(ns, 'path'); tip.setAttribute('d', 'M1 1 L6 4 L1 7'); tip.setAttribute('fill', 'none'); tip.setAttribute('stroke', 'var(--muted)'); marker.append(tip); defs.append(marker);
  const rects = [...map.querySelectorAll('[data-stage]')].map(button => {const r = button.getBoundingClientRect();return {x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height};});
  svg.replaceChildren(defs);
  rects.slice(0,-1).forEach((a,index) => {
    const b = rects[index+1], path = document.createElementNS(ns, 'path'); let d;
    if (Math.abs(a.y-b.y)<2) {
      const direction = b.x>a.x ? 1 : -1;
      d = `M ${direction>0?a.x+a.w+3:a.x-3} ${a.y+a.h/2} L ${direction>0?b.x-6:b.x+b.w+6} ${b.y+b.h/2}`;
    } else if (matchMedia('(max-width: 680px)').matches) {
      d = `M ${a.x-3} ${a.y+a.h/2} H ${a.x-17} V ${b.y+b.h/2} H ${b.x-6}`;
    } else {
      const direction = Math.floor(index/3)%2 ? -1 : 1;
      const edgeA = direction>0?a.x+a.w:a.x, edgeB = direction>0?b.x+b.w:b.x, outside = edgeA+direction*20;
      d = `M ${edgeA+direction*3} ${a.y+a.h/2} H ${outside} V ${b.y+b.h/2} H ${edgeB+direction*6}`;
    }
    path.setAttribute('d',d); path.setAttribute('class','journey-link'); path.setAttribute('marker-end','url(#journey-arrow)'); svg.append(path);
  });
}
function renderStage(index, reveal = false) {
  activeStage = index;
  const phase = Math.floor(index / 3), stage = stages[index];
  document.querySelectorAll('[data-phase]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.phase) === phase)));
  document.querySelectorAll('[data-stage]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.stage) === index)));
  $('stage-kicker').textContent = `ЭТАП ${String(index + 1).padStart(2, '0')} / ${stage.status}`;
  for (const [id, key] of [['stage-title','name'],['stage-why','why'],['stage-owner','owner'],['stage-output','output'],['stage-dependency','dependency'],['stage-cost','cost']]) $(id).textContent = stage[key];
  $('stage-tasks').replaceChildren(...stage.tasks.map(text => {const li = document.createElement('li');li.textContent = text;return li;}));
  $('stage-position').textContent = `${index + 1} из ${stages.length}`;
  $('stage-prev').disabled = index === 0; $('stage-next').disabled = index === stages.length - 1;
  if (reveal) $('stage-detail').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}
$('stage-prev').addEventListener('click', () => renderStage(Math.max(0, activeStage - 1)));
$('stage-next').addEventListener('click', () => renderStage(Math.min(stages.length - 1, activeStage + 1)));
function renderCase(key) {
  for (const [id, field] of [['case-title','title'],['case-text','text'],['case-verdict','verdict']]) $(id).textContent = cases[key][field];
  document.querySelectorAll('[data-case]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.case === key)));
}
document.querySelectorAll('[data-case]').forEach(b => b.addEventListener('click', () => renderCase(b.dataset.case)));
const formats = {
  text:{title:'Аналитический текст',description:'Подходит, когда важно раскрыть механизм, причинные связи и последствия. Сущность Лео выстраивает аргумент и подачу по готовым источникам.',output:'На вход: главный вопрос, фактура и ограничения. На выход: связный пост со ссылками и без новых неподтверждённых выводов.'},
  cards:{title:'Карточки',description:'Подходят, когда информацию удобно разложить по шагам, сравнениям или отдельным тезисам. Каждая карточка сохраняет смысл и необходимые оговорки.',output:'На вход: проверенные тезисы. На выход: последовательность карточек и подпись; оформление и изображения — на стороне Лео.'},
  video:{title:'Видео / Reels',description:'Подходит, когда в исходнике есть сильный законченный фрагмент или тему лучше объяснить коротким сценарием. Не обрезаем цитату так, чтобы поменять позицию говорящего.',output:'На вход: URL видео, таймкоды, контекст, текст фрагмента и дополнения. На выход: сценарий/нарезка и подпись; монтаж и права на использование — отдельная часть.'}
};
function renderFormat(key) {
  for (const [id,field] of [['format-title','title'],['format-description','description'],['format-output','output']]) $(id).textContent = formats[key][field];
  document.querySelectorAll('[data-format]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.format === key)));
}
document.querySelectorAll('[data-format]').forEach(b => b.addEventListener('click', () => renderFormat(b.dataset.format)));
const money = n => '$' + n.toFixed(2).replace('.', ',');
function renderBudget() {
  const p = $('budget-provider').value;
  $('budget-time').disabled = p !== 'apify'; $('budget-posts').disabled = p !== 'grok';
  const r = RadarRoadmapBudget.calculate({target:$('budget-target').value,provider:p,mode:$('budget-mode').value,research:$('budget-research').value,posts:$('budget-posts').value,minutes:$('budget-time').value});
  $('apify-average').textContent = money(r.average.total); $('apify-five').textContent = money(r.fiveWithReserve);
  $('apify-status').textContent = r.fiveWithReserve <= 4 ? 'По этому сценарию помещается в рабочий ориентир $4. До $5 остаётся запас.' : r.fiveWithReserve <= 5 ? 'Помещается в Free $5, но рабочий запас $1 уже не сохраняется.' : 'Выходит за Free $5: нужен меньший объём или отдельное решение по бюджету.';
  $('apify-breakdown').textContent = `Reddit: ${money(r.average.redditData)} за записи + ${money(r.average.redditStart)} за запуски.` + (p === 'apify' ? ` X: ${money(r.average.xData)} за данные + ${money(r.average.xCompute)} за вычисления.` : ' Twitter в этом варианте оплачивается в Grok, не в Apify.');
  const g = r.grokAverage;
  $('grok-estimate').textContent = `Сценарный расход: ${money(g.central)}–${money(g.high)} за средний месяц. За пять выпусков высокий сценарий — ${money(r.grokFive.high)}.`;
  $('grok-risk').textContent = g.high > 25 ? 'Уже высокий сценарий превышает $25: эта комбинация не помещается в целевой бюджет.' : r.grokFive.high > 25 ? 'Средний месяц помещается, но пять выпусков могут превысить $25. Нужны ограничения нагрузки или отдельный пересчёт.' : 'По выбранным допущениям помещается в $25. Это не доказанный потолок и не замер нового конвейера.';
  $('budget-formula').textContent = `За неделю: Reddit до ${r.redditRows} записей в 2 запусках; до ${r.dossiers} подробно рассматриваемых событий, ${r.threads} дочитываний. ` + (p === 'apify' ? `X: ${r.xRows} строк в ${r.xRuns} запусках, при 256 МБ и ${r.minutes} минутах на запуск. ` : `Grok X: ${r.posts} оплачиваемых получений постов, включая родительские/цитируемые/повторные. Это ${money(g.xTools)} в средний месяц только за X-инструмент. Допущение по X-токенам: ${money(g.xTokensCentral)}–${money(g.xTokensHigh)} в месяц, не измеренная цена. `) + `Месяц = 4,345 недели; расширенный столбец = 5 недель × 1,2. Модель текстовой обработки масштабирована из расчёта 22.10; дополнительные видео, база сравнения и накладные расходы не измерены. ` + (r.research === 'leo' ? 'Research через Perplexity Лео не списывается в Grok, но его собственное потребление не объявлено бесплатным и безлимитным.' : 'Grok research нужен половине подробных досье; $0,144808 / $0,25 за исследование — исторический ориентир и сценарная цена, не гарантированный максимум.');
}
for (const id of ['budget-target','budget-provider','budget-mode','budget-research','budget-posts','budget-time']) $(id).addEventListener('change', renderBudget);
buildJourney(); renderStage(0); renderCase('hype'); renderFormat('text'); renderBudget();
new ResizeObserver(drawJourney).observe($('journey-map')); drawJourney();
