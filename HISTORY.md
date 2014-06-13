### 0.7.1

+ Expose the underlying, xml parsed dav responses on davinci.Calendar and davinci.CalendarObject models.

### 0.7.0

+ Support providing timezone option to #createAccount and #syncCalendar

### 0.6.0

+ #syncCalendar added to public api
+ The promise returned from #createAccount now resolves with a davinci.Account object instead of an array of davinci.Calendar objects.

### 0.5.0

+ #deleteCalendarObject added to public api

### 0.4.0

+ #updateCalendarObject added to public api
+ Internal api refactoring to expose Request objects

### 0.3.1

+ Patch bug in build due to bug in brfs.

### 0.3.0

+ #createCalendarObject modified to support sandboxing.

### 0.2.0

+ #createCalendarObject added to public api

### 0.1.0

+ #createAccount added to public api
+ #createSandbox added to public api
