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
    bookStatusReserved: 'Swap in Progress',
    bookStatusSwapped: 'Swapped',
    bookLockedAction: 'In Approved Swap',

    // Locked swap warning modal
    lockedSwapTitle: 'Book in Active Swap',
    lockedSwapBody:
      "You can't send a new request for this book because a swap has already been approved with another user. If you'd like to edit or cancel that swap, reach out via chat/WhatsApp to the user you approved with, or update the status in the Requests Center.",
    lockedSwapOpenRequests: 'Open Requests Center',
    lockedSwapClose: 'Got it, close',

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
    fieldPhone: 'Phone Number (optional)',
    fieldPhonePh: 'e.g. +972 50-123-4567',
    fieldPhoneHint: 'Only shared with your swap partner if you both provide a phone number.',
    authCreateAccount: 'Create Account',
    authSignInSubmit: 'Sign In',
    authErrorEmailTaken: 'This email is already registered — try signing in instead.',
    authErrorInvalidCredentials: 'Incorrect email or password.',

    // Profile modal
    profileTitle: 'My Profile',
    profileSubtitle: 'Manage your contact details.',
    saveProfile: 'Save',
    toastProfileUpdated: 'Profile updated successfully!',

    // Proposal modal
    proposalTitle: 'Propose a Swap',
    proposalSubtitle: 'Pick one of your books to offer for "{{title}}".',
    proposalNoBooksTitle: "You don't have any available books to offer",
    proposalNoBooksSub: 'Add a book to start offering swaps.',
    proposalAddBookCta: 'Add a new book',
    proposalChooseBook: 'Choose a book to offer',
    proposalNoteLabel: 'Add a note (optional)',
    proposalNotePh: 'Say hello, suggest a meeting spot...',
    proposalSubmit: 'Send Proposal',

    // Requests header status dot
    requestsDotTooltipPending: 'Pending requests',
    requestsDotTooltipApproved: 'Request approved!',

    // Requests drawer
    requestsTitle: 'Requests Center',
    tabIncoming: 'Incoming Requests',
    tabOutgoing: 'Outgoing Requests',
    tabHistory: 'History',
    requestsEmptyIncoming: 'No incoming requests yet.',
    requestsEmptyOutgoing: "You haven't sent any proposals yet.",
    requestsEmptyHistory: 'No completed or closed requests yet.',
    requestedBookLabel: 'Wants',
    offeredBookLabel: 'Offers',
    noteLabel: 'Note',
    accept: 'Accept',
    decline: 'Decline',
    cancelRequest: 'Cancel Request',
    cancelSwap: 'Cancel Swap',
    markCompleted: 'Mark as Completed',
    openWhatsapp: 'Open WhatsApp Chat',
    dismissRequest: 'Dismiss',
    reasonBookSwappedElsewhere: 'Book already swapped in another deal',
    statusPending: 'Pending',
    statusAccepted: 'Accepted',
    statusDeclined: 'Declined',
    statusCancelled: 'Cancelled',
    statusCompleted: 'Completed',
    outgoingStatusPending: 'Awaiting Approval',
    outgoingStatusAccepted: 'Approved - Ready to Coordinate',
    outgoingStatusDeclined: 'Declined',
    outgoingStatusCancelled: 'Cancelled',
    outgoingStatusCompleted: 'Completed',
    openChat: 'Open Chat',
    withPerson: 'with {{name}}',
    fromPerson: 'from {{name}}',
    requestSentOn: 'Sent {{date}}',
    ownerLabelInline: 'Owner: {{name}}',
    locationLabelInline: 'Location: {{place}}',
    whatsappGreeting: "Hi! Let's coordinate our book swap on BookSwap 📚",
    whatsappPrivacyBadge: 'In-app chat only (WhatsApp requires mutual phone sharing)',

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
    toastSwapSent: 'Swap request sent successfully!',
    toastFavoriteAdded: 'Added to favorites',
    toastFavoriteRemoved: 'Removed from favorites',
    toastRequestAccepted: 'Request accepted!',
    toastRequestDeclined: 'Request declined.',
    toastRequestCancelled: 'Request cancelled.',
    toastRequestCompleted: 'Swap marked as completed!',

    // Book card request state
    requestedLabel: 'Requested',

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
    bookStatusReserved: 'בהליך החלפה',
    bookStatusSwapped: 'הוחלף',
    bookLockedAction: 'בהחלפה מאושרת',

    // Locked swap warning modal
    lockedSwapTitle: 'הספר כבר נמצא בהליך החלפה מאושר',
    lockedSwapBody:
      'לא ניתן לשלוח בקשה חדשה עבור ספר זה מכיוון שכבר אושרה עבורו החלפה מול משתמש אחר. אם תרצה לערוך או לבטל את ההחלפה, יש לפנות לצ\'אט/וואטסאפ מול המשתמש שאישרת מולו, או לעדכן את הסטטוס במרכז הבקשות.',
    lockedSwapOpenRequests: 'פתח את מרכז הבקשות',
    lockedSwapClose: 'הבנתי, סגור',

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
    fieldPhone: 'מספר טלפון (אופציונלי)',
    fieldPhonePh: 'לדוגמה: 050-1234567',
    fieldPhoneHint: 'המספר ישותף עם שותף ההחלפה שלך רק אם שניכם מספקים מספר טלפון.',
    authCreateAccount: 'צור חשבון',
    authSignInSubmit: 'התחבר',
    authErrorEmailTaken: 'כתובת האימייל כבר רשומה — נסו להתחבר במקום.',
    authErrorInvalidCredentials: 'אימייל או סיסמה שגויים.',

    // Profile modal
    profileTitle: 'הפרופיל שלי',
    profileSubtitle: 'נהלו את פרטי הקשר שלכם.',
    saveProfile: 'שמור',
    toastProfileUpdated: 'הפרופיל עודכן בהצלחה!',

    // Proposal modal
    proposalTitle: 'הצעת החלפה',
    proposalSubtitle: 'בחרו אחד מהספרים שלכם להציע עבור "{{title}}".',
    proposalNoBooksTitle: 'אין לך ספרים זמינים להחלפה כרגע',
    proposalNoBooksSub: 'הוסיפו ספר כדי להתחיל להציע החלפות.',
    proposalAddBookCta: 'הוסף ספר חדש',
    proposalChooseBook: 'בחרו ספר להציע',
    proposalNoteLabel: 'הוסיפו הערה (אופציונלי)',
    proposalNotePh: 'אמרו שלום, הציעו נקודת מפגש...',
    proposalSubmit: 'שלח הצעה',

    // Requests drawer
    // Requests header status dot
    requestsDotTooltipPending: 'בקשות ממתינות',
    requestsDotTooltipApproved: 'בקשה אושרה!',

    requestsTitle: 'מרכז בקשות',
    tabIncoming: 'בקשות שהתקבלו',
    tabOutgoing: 'בקשות ששלחתי',
    tabHistory: 'היסטוריית החלפות',
    requestsEmptyIncoming: 'אין עדיין בקשות נכנסות.',
    requestsEmptyOutgoing: 'עדיין לא שלחתם הצעות.',
    requestsEmptyHistory: 'אין עדיין בקשות שהושלמו או נסגרו.',
    requestedBookLabel: 'מבקש/ת',
    offeredBookLabel: 'מציע/ה',
    noteLabel: 'הערה',
    accept: 'אשר בקשה',
    decline: 'דחה',
    cancelRequest: 'בטל בקשה',
    cancelSwap: 'בטל החלפה',
    markCompleted: 'סמן כהושלם',
    openWhatsapp: 'פתח שיחה בוואטסאפ',
    dismissRequest: 'הסר',
    reasonBookSwappedElsewhere: 'הספר כבר הוחלף בעסקה אחרת',
    statusPending: 'ממתין',
    statusAccepted: 'אושר',
    statusDeclined: 'נדחה',
    statusCancelled: 'בוטלה',
    statusCompleted: 'הושלמה בהצלחה',
    outgoingStatusPending: 'ממתין לאישור',
    outgoingStatusAccepted: 'אושר - ניתן לתאם',
    outgoingStatusDeclined: 'נדחה',
    outgoingStatusCancelled: 'בוטלה',
    outgoingStatusCompleted: 'הושלמה בהצלחה',
    openChat: 'פתח צ\'אט',
    withPerson: 'עם {{name}}',
    fromPerson: 'מאת {{name}}',
    requestSentOn: 'נשלח {{date}}',
    ownerLabelInline: 'בעלים: {{name}}',
    locationLabelInline: 'מיקום: {{place}}',
    whatsappGreeting: 'היי! בואו נתאם את החלפת הספרים דרך BookSwap 📚',
    whatsappPrivacyBadge: "תיאום בצ'אט בלבד",

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
    toastSwapSent: 'הבקשה נשלחה בהצלחה!',
    toastFavoriteAdded: 'הספר נוסף למועדפים',
    toastFavoriteRemoved: 'הוסר מהמועדפים',
    toastRequestAccepted: 'הבקשה אושרה!',
    toastRequestDeclined: 'הבקשה נדחתה.',
    toastRequestCancelled: 'הבקשה בוטלה.',
    toastRequestCompleted: 'ההחלפה סומנה כהושלמה!',

    // Book card request state
    requestedLabel: 'נשלחה בקשה',

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
