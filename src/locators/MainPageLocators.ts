export class MainPageLocators {
    // Навигационные табы
    static readonly NAVIGATION_TABS = '[data-test-id="pageHeaderNavigation.item"]';
    static readonly MORE_BUTTON = '[data-test-id="pageHeaderNavigation.moreItem"]';
    static readonly MORE_DROPDOWN = '[data-test-id="pageHeaderNavigation.popupList"]';
    static readonly MORE_DROPDOWN_ITEMS = '[data-test-id="pageHeaderNavigation.popupItem"]';
    static readonly NAVIGATION_TITLE = '[data-test-id="pageHeaderNavigation.title"]';
    static readonly NAVIGATION_IMAGE = '[data-test-id="pageHeaderNavigation.image"]';
    static readonly NAVIGATION_COLOR_ELEMENT = '[data-test-id="pageHeaderNavigation.colorElement"]';
    static readonly NAVIGATION_WRAPPER = '[data-test-id="pageHeaderNavigationDesktop.navigationWrapper"]';

    // Календарь
    static readonly CALENDAR_DAY = '[data-test-id="horizontalCalendar.day"]';
    static readonly CALENDAR_DATE_TEXT = '[data-test-id="horizontalCalendar.dateText"]';
    static readonly CALENDAR_DAY_NAME = '[data-test-id="horizontalCalendar.dayName"]';
    static readonly CALENDAR_RIGHT_ARROW = '[data-test-id="repertoryActors.controlRight"]';
    static readonly CALENDAR_LEFT_ARROW = '[data-test-id="repertoryActors.controlLeft"]';

    // Баннеры
    static readonly BANNERS_CONTAINER = '[data-test-id="featured.sliderContainer"]';
    static readonly BANNERS = '[data-test-id="featured.sliderContainer"] a';
    static readonly BANNER_NEXT_BUTTON = '[data-test-id="featured.sliderNextButton"]';
    static readonly BANNER_PREV_BUTTON = '[data-test-id="featured.sliderPrevButton"]';

    // События
    static readonly EVENT_CARD_ROOT = '[data-test-id="eventCard.root"]';
    static readonly EVENT_CARD_LINK = '[data-test-id="eventCard.link"]';
    static readonly EVENT_CARD_FAVOURITE = '[data-test-id="event-card-favourite-button"]';
    static readonly EVENT_CARD_PRICE = '[data-test-id="event-card-price"]';
    static readonly EVENT_CARD_RATING = '[data-test-id="event-card-rating"]';
    static readonly EVENT_CARD_TITLE = '[data-test-id="eventCard.eventInfoTitle"]';
    static readonly EVENT_CARD_DETAILS = '[data-test-id="eventCard.eventInfoDetails"]';

    // ТОП-10
    static readonly TOP_SECTION = '[data-test-id="topEvents.eventContainer"]';
    static readonly TOP_LOGO = '[data-test-id="topEvents.logo"]';
    static readonly TOP_CARD_NUMBER = '[data-test-id="topCard.numberImage"]';
    static readonly TOP_CARD_EVENT = '[data-test-id="topCard.eventImage"]';
    static readonly TOP_CARD_TITLE = '[data-test-id="topCard.title"]';
    static readonly TOP_CARD_RUBRIC = '[data-test-id="topCard.rubricTag"]';
    static readonly TOP_CARD_DATE = '[data-test-id="topCard.date"]';

    // Кешбек
    static readonly CASHBACK_BADGE = '[data-test-id="plusCashbackBadge.item"]';

    // Основной фид
    static readonly FEED_TABS = '[data-test-id="eventsFeed.title"]';

    // Баннеры для закрытия
    static readonly FIRST_BANNER = ".CwK8rl";
    static readonly SECOND_BANNER = '[data-test-id="subscriptionPopup.closeButton"]';

    // Блок "Вы смотрели"
    static readonly VIEWED_SECTION = ".IMCiK8";
    static readonly VIEWED_CARDS = ".Wkcz4A .z2H_NI";
}
