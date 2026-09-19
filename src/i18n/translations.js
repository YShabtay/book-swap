export const translations = {
  en: {
    // Header
    appName: 'BookSwap',
    tagline: 'Swap. Read. Travel light.',
    addBook: 'Add Book',
    langToggle: 'עב',
    signInRegister: 'Sign In / Register',
    signOut: 'Log Out',
    myBooks: 'My Books',
    requests: 'Requests',

    // Search & filters
    searchPlaceholder: 'Search by title or author...',
    filterCategory: 'Category',
    filterLanguage: 'Book Language',
    allLocations: 'All Destinations',
    allCategories: 'All Categories',
    allLanguages: 'All Languages',
    resultsCount: '{{count}} books found',
    noResults: 'No books match your search',
    noResultsSub: 'Try adjusting your filters or search terms',
    clearFilters: 'Clear filters',
    myBooksEmpty: "You haven't listed any books yet.",
    myBooksEmptySub: 'Tap "Add Book" to share your first one.',

    // Book languages
    lang_english: 'English',
    lang_hebrew: 'Hebrew',

    // Categories
    cat_fiction: 'Fiction',
    cat_self_growth: 'Self-Growth',
    cat_thriller: 'Thriller',
    cat_travel: 'Travel Guides',
    cat_scifi: 'Sci-Fi',
    cat_mystery: 'Mystery',
    cat_romance: 'Romance',
    cat_biography: 'Biography',
    cat_fantasy: 'Fantasy',

    // Conditions
    cond_like_new: 'Like New',
    cond_good: 'Good',
    cond_well_traveled: 'Well-Traveled',

    // Location combobox & geolocation
    searchCityPlaceholder: 'Search city, neighborhood or beach...',
    useMyLocation: 'Use My Current Location',
    locating: 'Locating you...',
    locationActive: 'Using your current location',
    locationErrorDenied: 'Location access denied',
    locationErrorGeneric: "Couldn't get your location",
    locationNotSupported: 'Geolocation is not supported by your browser',
    noCityMatches: 'No matching places',
    clearLocation: 'Clear location',
    myLocationLabel: 'My Current Location',
    myLocationNearest: 'Your Location (nearest: {{place}})',

    // Radius filter
    radius_any: 'Any distance',
    radiusNeedsReference: 'Use your location or pick a place to filter by radius',
    radiusNoLimit: 'No distance limit',
    radiusUpToKm: 'Up to {{km}} km',
    radiusCustomKm: 'Custom distance: {{km}} km',
    radiusChipKm: '{{km}} km',
    kmUnit: 'km',

    // Book card
    by: 'by {{author}}',
    distanceAway: '{{distance}} away',
    condition: 'Condition',
    listedBy: 'Listed by {{name}}',
    requestSwap: 'Request Swap',
    deleteBook: 'Delete Book',
    deleteConfirmTitle: 'Delete this book?',
    deleteConfirmBody: 'This will remove "{{title}}" from the listing.',
    deleteConfirmButton: 'Delete',
    toastBookDeleted: 'Book deleted successfully',
    editBook: 'Edit',
    editBookTitle: 'Edit Book',
    editBookSubtitle: "Update your book's details.",
    saveChanges: 'Save Changes',
    toastBookUpdated: 'Book details updated successfully!',

    // Add Book Modal
    addBookTitle: 'Share a Book',
    addBookSubtitle: "Fill in the details and it'll appear in the listing instantly.",
    fieldTitle: 'Book Title',
    fieldTitlePh: 'e.g. The Alchemist',
    fieldAuthor: 'Author',
    fieldAuthorPh: 'e.g. Paulo Coelho',
    fieldCategory: 'Category',
    fieldLanguage: 'Book Language',
    fieldCondition: 'Condition',
    fieldLocation: 'Your Location',
    fieldLocationPh: 'e.g. Tel Aviv (Florentin)',
    fieldLocationHint: 'Pick a suggested place to enable distance & radius search.',
    useCurrentLocationDropdown: 'Use My Current Location',
    locatingShort: 'Locating...',
    toastLocationFailed: 'Could not detect location, please choose a city from the list',
    fieldCoverImage: 'Book Cover (optional)',
    fieldCoverUrlPh: 'Paste an image URL...',
    fieldCoverUpload: 'Upload a photo',
    fieldCoverRemove: 'Remove image',
    fieldCoverHint: "No image? We'll generate a neat cover for you.",
    fieldDescription: 'Description (optional)',
    fieldDescriptionPh: 'Add any notes about this book...',
    cancel: 'Cancel',
    submit: 'Add Book',
    required: 'Required',
    selectOption: 'Select...',

    // Auth modal
    authTitle: 'Welcome to BookSwap',
    authSubtitle: 'Sign in or create an account to continue.',
    authHintAddBook: 'Sign in to add a book to the listing.',
    authHintRequestSwap: 'Sign in to request a swap.',
    authTabRegister: 'Register',
    authTabSignIn: 'Sign In',
    fieldName: 'Your Name',
    fieldNamePh: 'e.g. Dana Levi',
    fieldEmail: 'Email',
    fieldEmailPh: 'e.g. dana@example.com',
    fieldPassword: 'Password',
    fieldPasswordPh: 'At least 4 characters',
    authCreateAccount: 'Create Account',
    authSignInSubmit: 'Sign In',
    authErrorEmailTaken: 'This email is already registered — try signing in instead.',
    authErrorInvalidCredentials: 'Incorrect email or password.',

    // Proposal modal
    proposalTitle: 'Propose a Swap',
    proposalSubtitle: 'Pick one of your books to offer for "{{title}}".',
    proposalNoBooksTitle: "You haven't added any books yet",
    proposalNoBooksSub: 'Add a book first so you have something to offer in exchange.',
    proposalAddBookCta: 'Add a Book',
    proposalChooseBook: 'Choose a book to offer',
    proposalNoteLabel: 'Add a note (optional)',
    proposalNotePh: 'Say hello, suggest a meeting spot...',
    proposalSubmit: 'Send Proposal',

    // Requests drawer
    requestsTitle: 'Requests',
    tabIncoming: 'Incoming',
    tabSent: 'Sent',
    requestsEmptyIncoming: 'No incoming requests yet.',
    requestsEmptySent: "You haven't sent any proposals yet.",
    requestedBookLabel: 'Wants',
    offeredBookLabel: 'Offers',
    noteLabel: 'Note',
    accept: 'Accept',
    decline: 'Decline',
    statusPending: 'Pending',
    statusAccepted: 'Accepted',
    statusDeclined: 'Declined',
    openChat: 'Open Chat',
    withPerson: 'with {{name}}',

    // Chat
    chatWith: 'Chat with {{name}}',
    chatPlaceholder: 'Type a message...',
    chatSend: 'Send',
    chatEmpty: 'Say hi and coordinate your swap!',
    chatSystemAccepted: 'Proposal accepted — you can now coordinate the swap here.',

    // Favorites
    favorites: 'Saved',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    favoritesEmpty: "You haven't saved any books yet.",
    favoritesEmptySub: 'Tap the heart on a book to save it here.',

    // Radius-specific empty state
    emptyRadiusTitle: 'No books found in this area',
    emptyRadiusSub: 'Try expanding your search radius.',
    expandRadiusCta: 'Expand Radius',

    // Toasts
    toastBookAdded: 'Book added successfully!',
    toastSwapSent: 'Swap request sent!',
    toastFavoriteAdded: 'Added to favorites',
    toastFavoriteRemoved: 'Removed from favorites',

    // Footer
    footerText: 'Built for travelers who love a good story.',
  },
  he: {
    // Header
    appName: 'בוקסוואפ',
    tagline: 'להחליף. לקרוא. לנסוע קליל.',
    addBook: 'הוסף ספר',
    langToggle: 'EN',
    signInRegister: 'התחברות / הרשמה',
    signOut: 'התנתקות',
    myBooks: 'הספרים שלי',
    requests: 'בקשות',

    // Search & filters
    searchPlaceholder: 'חיפוש לפי שם ספר או מחבר...',
    filterCategory: 'קטגוריה',
    filterLanguage: 'שפת הספר',
    allLocations: 'כל היעדים',
    allCategories: 'כל הקטגוריות',
    allLanguages: 'כל השפות',
    resultsCount: '{{count}} ספרים נמצאו',
    noResults: 'לא נמצאו ספרים התואמים לחיפוש',
    noResultsSub: 'נסו לשנות את הסינון או את מילות החיפוש',
    clearFilters: 'נקה סינון',
    myBooksEmpty: 'עדיין לא הוספתם ספרים.',
    myBooksEmptySub: 'לחצו על "הוסף ספר" כדי לשתף את הראשון שלכם.',

    // Book languages
    lang_english: 'אנגלית',
    lang_hebrew: 'עברית',

    // Categories
    cat_fiction: 'ספרות יפה',
    cat_self_growth: 'העצמה אישית',
    cat_thriller: 'מותחן',
    cat_travel: 'מדריכי טיולים',
    cat_scifi: 'מדע בדיוני',
    cat_mystery: 'מסתורין',
    cat_romance: 'רומנטי',
    cat_biography: 'ביוגרפיה',
    cat_fantasy: 'פנטזיה',

    // Conditions
    cond_like_new: 'כמו חדש',
    cond_good: 'מצב טוב',
    cond_well_traveled: 'מנוסה בדרכים',

    // Location combobox & geolocation
    searchCityPlaceholder: 'חפש עיר, שכונה או חוף...',
    useMyLocation: 'לפי המיקום הנוכחי שלי',
    locating: 'מאתר את המיקום שלך...',
    locationActive: 'משתמש במיקום הנוכחי שלך',
    locationErrorDenied: 'הגישה למיקום נדחתה',
    locationErrorGeneric: 'לא הצלחנו לאתר את מיקומך',
    locationNotSupported: 'הדפדפן שלך לא תומך באיתור מיקום',
    noCityMatches: 'לא נמצאו מקומות מתאימים',
    clearLocation: 'נקה מיקום',
    myLocationLabel: 'המיקום הנוכחי שלי',
    myLocationNearest: 'המיקום שלך (הכי קרוב: {{place}})',

    // Radius filter
    radius_any: 'כל מרחק',
    radiusNeedsReference: 'השתמשו במיקום שלכם או בחרו מקום כדי לסנן לפי רדיוס',
    radiusNoLimit: 'ללא הגבלה',
    radiusUpToKm: 'עד {{km}} ק״מ',
    radiusCustomKm: 'מרחק מותאם: {{km}} ק״מ',
    radiusChipKm: '{{km}} ק״מ',
    kmUnit: 'ק״מ',

    // Book card
    by: 'מאת {{author}}',
    distanceAway: '{{distance}} ממך',
    condition: 'מצב',
    listedBy: 'פורסם על ידי {{name}}',
    requestSwap: 'בקש החלפה',
    deleteBook: 'מחק ספר',
    deleteConfirmTitle: 'האם למחוק את הספר?',
    deleteConfirmBody: 'הפעולה תסיר את "{{title}}" מהרשימה.',
    deleteConfirmButton: 'מחק',
    toastBookDeleted: 'הספר נמחק בהצלחה',
    editBook: 'ערוך',
    editBookTitle: 'עריכת ספר',
    editBookSubtitle: 'עדכנו את פרטי הספר.',
    saveChanges: 'שמור שינויים',
    toastBookUpdated: 'הפרטים עודכנו בהצלחה!',

    // Add Book Modal
    addBookTitle: 'שתפו ספר',
    addBookSubtitle: 'מלאו את הפרטים והספר יופיע ברשימה מיידית.',
    fieldTitle: 'שם הספר',
    fieldTitlePh: 'לדוגמה: הקוסם מארץ עוץ',
    fieldAuthor: 'מחבר',
    fieldAuthorPh: 'לדוגמה: פאולו קואלו',
    fieldCategory: 'קטגוריה',
    fieldLanguage: 'שפת הספר',
    fieldCondition: 'מצב הספר',
    fieldLocation: 'המיקום שלך',
    fieldLocationPh: 'לדוגמה: תל אביב (פלורנטין)',
    fieldLocationHint: 'בחרו מקום מהרשימה כדי לאפשר חיפוש לפי מרחק ורדיוס.',
    useCurrentLocationDropdown: 'השתמש במיקום הנוכחי שלי',
    locatingShort: 'מאתר מיקום...',
    toastLocationFailed: 'לא ניתן לאתר מיקום, בחר עיר מהרשימה',
    fieldCoverImage: 'כריכת הספר (אופציונלי)',
    fieldCoverUrlPh: 'הדביקו קישור לתמונה...',
    fieldCoverUpload: 'העלאת תמונה',
    fieldCoverRemove: 'הסר תמונה',
    fieldCoverHint: 'אין תמונה? ניצור לכם כריכה נאה אוטומטית.',
    fieldDescription: 'תיאור (אופציונלי)',
    fieldDescriptionPh: 'הוסיפו הערות על הספר...',
    cancel: 'ביטול',
    submit: 'הוסף ספר',
    required: 'שדה חובה',
    selectOption: 'בחר/י...',

    // Auth modal
    authTitle: 'ברוכים הבאים לבוקסוואפ',
    authSubtitle: 'התחברו או צרו חשבון כדי להמשיך.',
    authHintAddBook: 'יש להתחבר כדי להוסיף ספר לרשימה.',
    authHintRequestSwap: 'יש להתחבר כדי לבקש החלפה.',
    authTabRegister: 'הרשמה',
    authTabSignIn: 'התחברות',
    fieldName: 'השם שלך',
    fieldNamePh: 'לדוגמה: דנה לוי',
    fieldEmail: 'אימייל',
    fieldEmailPh: 'לדוגמה: dana@example.com',
    fieldPassword: 'סיסמה',
    fieldPasswordPh: 'לפחות 4 תווים',
    authCreateAccount: 'צור חשבון',
    authSignInSubmit: 'התחבר',
    authErrorEmailTaken: 'כתובת האימייל כבר רשומה — נסו להתחבר במקום.',
    authErrorInvalidCredentials: 'אימייל או סיסמה שגויים.',

    // Proposal modal
    proposalTitle: 'הצעת החלפה',
    proposalSubtitle: 'בחרו אחד מהספרים שלכם להציע עבור "{{title}}".',
    proposalNoBooksTitle: 'עדיין לא הוספתם ספרים',
    proposalNoBooksSub: 'הוסיפו ספר קודם כדי שיהיה לכם מה להציע בתמורה.',
    proposalAddBookCta: 'הוסף ספר',
    proposalChooseBook: 'בחרו ספר להציע',
    proposalNoteLabel: 'הוסיפו הערה (אופציונלי)',
    proposalNotePh: 'אמרו שלום, הציעו נקודת מפגש...',
    proposalSubmit: 'שלח הצעה',

    // Requests drawer
    requestsTitle: 'בקשות',
    tabIncoming: 'נכנסות',
    tabSent: 'שנשלחו',
    requestsEmptyIncoming: 'אין עדיין בקשות נכנסות.',
    requestsEmptySent: 'עדיין לא שלחתם הצעות.',
    requestedBookLabel: 'מבקש/ת',
    offeredBookLabel: 'מציע/ה',
    noteLabel: 'הערה',
    accept: 'אשר',
    decline: 'דחה',
    statusPending: 'ממתין',
    statusAccepted: 'אושר',
    statusDeclined: 'נדחה',
    openChat: 'פתח צ\'אט',
    withPerson: 'עם {{name}}',

    // Chat
    chatWith: 'צ\'אט עם {{name}}',
    chatPlaceholder: 'הקלידו הודעה...',
    chatSend: 'שלח',
    chatEmpty: 'תגידו שלום ותתאמו את ההחלפה!',
    chatSystemAccepted: 'ההצעה אושרה — עכשיו אפשר לתאם את ההחלפה כאן.',

    // Favorites
    favorites: 'מועדפים',
    addToFavorites: 'הוסף למועדפים',
    removeFromFavorites: 'הסר מהמועדפים',
    favoritesEmpty: 'עדיין לא שמרתם ספרים.',
    favoritesEmptySub: 'לחצו על הלב בכרטיס ספר כדי לשמור אותו כאן.',

    // Radius-specific empty state
    emptyRadiusTitle: 'לא נמצאו ספרים באזור זה',
    emptyRadiusSub: 'נסו להרחיב את רדיוס החיפוש.',
    expandRadiusCta: 'הרחב רדיוס חיפוש',

    // Toasts
    toastBookAdded: 'הספר נוסף בהצלחה!',
    toastSwapSent: 'הצעת ההחלפה נשלחה!',
    toastFavoriteAdded: 'הספר נוסף למועדפים',
    toastFavoriteRemoved: 'הוסר מהמועדפים',

    // Footer
    footerText: 'נבנה בשביל מטיילים שאוהבים סיפור טוב.',
  },
}

export function translate(lang, key, params) {
  const dict = translations[lang] || translations.en
  let str = dict[key] ?? translations.en[key] ?? key
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      str = str.replaceAll(`{{${k}}}`, v)
    })
  }
  return str
}
