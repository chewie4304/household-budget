# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### Added
- **Interactive Logo Home Link:** Configured an interactive onclick="showAccountsView()" event handler on the top-left sticky application header logo, providing a fast, tactile shortcut back to the primary dashboard.
- **Header Dropdown Home Choice:** Added a prominent, main-level navigation action labeled Home inside the floating menu dropdown, positioned directly above "+ Add Transaction" for maximum visibility.
- **High-Fidelity Brand Menu Icon:** Swapped out the standard Home emoji for your custom icon-192.png brand emblem inside the newly added Home dropdown button, scaling it cleanly to a height and width of 6 units with rounded corners and a soft drop shadow to match native application aesthetics.
- **Persistent Dropdown Accounts Sub-Menu:** Standardized the dropdown navigation structure so the Accounts submenu remains persistently displayed across both home cockpit dashboard states and individual ledger details views.
- **Infinite Carousel Summary Deck:** Embedded a high-performance double-card infinite carousel slider inside the mobile ledger view, allowing users to swipe infinitely in either direction to cycle between Account-Specific and global Monthly Summaries.
- **Frictionless Touch Delegation:** Programmed smart gesture delegation that isolates horizontal finger swipes. Touches starting on the header summary deck trigger custom elastic order-swapping transformations, while swipes elsewhere on the screen continue to sweep chronological ledger feeds for effortless account cycling.
- **Sticky Desktop Cockpit Sidebar:** Integrated a media-queried CSS layout engine that locks the left-hand cockpit sidebar to a sticky state on desktop viewports. The global Monthly Summary, relocated Account-Specific summaries, and recurring Planned Transactions now remain permanently pinned in view as you scroll through long transaction ledgers.
- **Scroll Isolation and Spill Protection:** Bound the sticky cockpit layout to a viewport-restricted maximum height with vertical scrollbars and overscroll containment, allowing the sidebar to be scrolled independently if widget heights exceed screen boundaries without bleeding scroll inputs into the background page.
- **Ledger-Specific Quick Search Engine:** Deployed a highly responsive transaction search input field inside the individual account ledger balances card, letting users filter the active bank account history chronologically on any criteria (including tags, payees, or values) with automated clearing buttons.

### Changed
- **Home Landing View Enforcement:** Modified applySavedViewState() to ignore deep-linked active account views during initial application boots. The app will now consistently initialize onto the Home accounts cockpit or global transactions page.
- **Streamlined Accordion Submenu:** Purged the redundant All Accounts item inside the context-aware accordion list, keeping the inner dropdown menu focused strictly on active financial accounts.
- **Dropdown Typography and Scaling Adjustments:** Scaled up font sizes inside the floating dropdown, making the Home and Add Transaction core button blocks highly prominent text-xl and nesting individual account selection buttons at a highly readable text-sm (increased from text-xs).
- **Accounts Sub-menu Heading Icon Refinement:** Transitioned the Accounts submenu accordion icon from the home emoji to the bank emoji to establish a distinct visual separation from the main brand-logo Home button.
- **Dynamic Programmatic Card Heights:** Configured relocateAccountSummaryCard() to dynamically control card height styles. Both the global Monthly Summary and the Account-Specific Summary cards are locked to exactly 188px on desktop viewports to align perfectly with the balances card and preserve spacious internal padding, while expanding to full height inside the mobile slider.
- **Symmetric Homepage Transactions View Scaling:** Redesigned the global Transactions list cards to inherit premium upscaled typography. Expanded payee names to a prominent text-lg, adjusted dates and balances to use high-contrast tracking rules, and formatted receipt links and status buttons with a thick, tactile layout presence.
- **Standardized Tag Filter Dimensions:** Refactored the Global Label Filter layout to use standard Tailwind height and width classes, removing arbitrary bracket values from class configurations.
- **Line-Wrapped Transaction Card Dates:** Decoupled the transaction date from the account name line inside the global homepage Transactions list card, stacking the date on its own dedicated line to accommodate the upscaled typography with zero horizontal overcrowding.
- **Unified Ledger Typography Scaling:** Standardized the transaction card date layout inside individual account detailed ledger views to use high-contrast text-xs font tracking, matching the homepage list aesthetics with zero square brackets.
- **Harmonized Label Filter Cards:** Refactored the ledger view label filter to inherit the same modern class layout as the global homepage filter. Upgraded sub-container typography to use highly standard, bracket-free text-xs styles and expanded dynamic preview pills to display matching text-xs font-black tracking-wide styles.
- **Symmetric Mobile Summary Card Sizing:** Standardized mobile card heights for both global and account-specific summary views to exactly 176px. Standardized relocateAccountSummaryCard() viewport height outputs and HTML wrapper dimensions to resolve visual sizing differences and eliminate height jumps when clicking between homepage dashboards and detailed account ledger sliders.
- **Broadened Duplicate Transaction Detection:** Removed the payee and payer validation requirement from the transaction save pipeline scanner. Duplicate logging checks now alert users when matching sums are recorded in the same financial ledger within a seven-day window, regardless of text mismatches or payee name variations.
- **Re-shuffled Ledger Quick Actions Card:** Reorganized the individual ledger details quick actions card into a compact three-row setup. Placed Current and Cleared balances side-by-side in Row 1, aligned the Portal launcher and Add Transaction actions in Row 2, and embedded the live Ledger search bar in Row 3 to maximize vertical space and desktop grid alignments.
- **Unification of Layout Shapes and Sizing:** Standardized all inputs, typable areas, autocomplete dropdown lists, select dropdown menu triggers, and modal actions to inherit a unified rounded-2xl visual style. This aligns element structures across the entire dashboard to match the organic visual shape of summary sub-cards.
- **Symmetric Search Fields and Icon Alignment:** Refactored the ledger quick-search widget to scale up to an identical height of 42px and a readable text-sm typography size, matching the style and appearance of the home switcher search inputs. Configured absolute-positioned magnifying glass emojis inside all search widgets to preserve horizontal parity across views on load.

### Fixed
- **Fluid Carousel Swiping Transitions:** Streamlined executeSummaryCardSwitch() by removing immediate coordinate resets during active swipe transitions. This allows the cards to slide smoothly to their target locations directly from your finger's drag offset with zero awkward jumping or snapping.
- **Inversion-Free Carousel Physics:** Corrected card swipe endpoints to parse raw finger offsets directly from the changedTouches touchstart delta instead of translating the CSS transform position. This prevents calculations from inverting during carousel loop orders, ensuring the active card glides smoothly in the direction of the swipe with zero visual jumping or rebound snapping.
- **Widescreen Cockpit Scroll-Shift Prevention:** Locked the desktop sticky top offset to exactly 89px. By matching the exact height of the header plus the top container padding, the sidebar remains perfectly stationary on scroll start with zero visual shifting or alignment jumps.
- **Aligned Mobile Filter Transitions:** Refactored the homepage right-column feed container to utilize responsive gap constraints of 12px on mobile screens and 16px on desktop screens. This perfectly matches the ledger feed vertical space-y-3 spacing structure, eliminating the 4px vertical shift when navigating between the homepage and individual account details views.
- **Ledger Header Syntax Error:** Resolved a duplicate heading check inside renderTransactions() that caused an unexpected end of input syntax error crash on load.

## [1.6.5] - 2026-09-03

### Added
- **Independent Account Calendar Filtering:** Declared a dedicated account-specific state tracker (`selectedAccountMonth`) and event pipeline (`setSelectedAccountMonth()`) inside your ledger dashboard. This allows the global dashboard overview card and the active account details panel to navigate historical timelines completely independently.
- **Clickable Account Header Shortcut:** Converted the dynamic header typography context into an interactive button block (`#header-text-button`). Tapping or clicking the account details (name, bank, last 4 digits) inside any active ledger view instantly launches the "Edit Account" modal.
- **Dynamic Context Cursor Switching:** Configured the application header button to alternate between standard text cursors (`cursor-default`) during dashboard cockpit views and clickable indicators (`cursor-pointer`) when viewing individual account ledgers.

### Changed
- **Header Typography Scaling:** Scaled up the sticky application header typography to improve legibility and visual prominence. Enlarged the main brand and dynamic account title (`#header-main-title`) from `text-lg` to `text-xl`, and enlarged the tagline and dynamic bank institution metadata subtitle (`#header-sub-title`) from `text-[10px]` to `text-xs.
- **Header Icon Scaling:** Enlarged the brand emblem image from `h-10 w-10` to `h-12 w-12`, bringing it into perfect alignment with the scaled-up text sizes.
- **Mobile Arrow Navigation Removal:** Updated the header account navigation arrow wrapper from `sm:flex` to `lg:flex` inside a static responsive box, completely hiding the desktop click-to-cycle arrows on all mobile and tablet viewports where touch swiping handles navigation.
- **Widescreen Financial Cockpit Stack:** Refactored `renderMonthlySummary()` to keep the global Monthly Summary widget visible inside the desktop left column when inspecting individual account details. This establishes a vertical cockpit view displaying global budget totals and specific account balances stacked symmetrically.
- **Header Alignment and Shifting Prevention:** Refactored the sticky application header to utilize a flexible branding spacer layout (`flex-1 min-w-0`). This absorbs all dynamic width adjustments when account titles change length, keeping the right-hand desktop navigation controls and menu trigger permanently locked and flush to the right margin with zero physical shifting.
- **Ledger Initial State Alignment:** Configured `showTransactionsView()` to sync the active ledger's calendar viewport to match the global dashboard's active month upon loading an individual card, ensuring a seamless, aligned starting point before enabling independent calendar adjustments.

### Fixed
- **Home View Navigation Arrows Leak:** Swapped the `lg:flex` breakpoint class on `#header-account-nav-arrows` for a standard flex helper. This allows browser layout logic to correctly respect the hidden class when returning to the landing dashboard on widescreen monitors.
- **Signed-Math Alert Thresholds:** Standardized asset and credit card liability checks using raw signed balances directly rather than converting values to positive absolute numbers. Dropping below a negative minimum threshold (e.g. going from -$500 to -$1200 on an alert set to -$1000) now correctly triggers a high-priority "High Debt" alert with a red warning badge.
- **Dynamic Minus Symbol Placement:** Injected a localized alert currency formatter that positions negative signs inside the currency block, outputting as "-$1,000.00" rather than "$-1,000.00" inside the dashboard and dialog UI feeds.
- **In-Memory Balance Syncing:** Restored a call to `renderAccounts()` inside the `home-transactions` and `activeAccountId` rendering branches of `toggleTxStatus()`. This ensures that toggling a transaction status between Pending ("P") and Cleared ("C") inside any active view immediately repaints and updates your main Accounts home page cards and cleared balances without requiring a manual page refresh.

## [1.6.4] - 2026-09-03

### Added
- **Global View Action Swapping:** Configured a secondary quick-action button (`#home-add-transaction-button`) inside the Controls Container heading block. When toggling the main dashboard switch from Accounts to Transactions, the "+ New Account" action now dynamically slides away and is replaced by a "+ Add Transaction" action, ensuring the primary viewport always maintains an active, context-appropriate workflow shortcut.
- **Account Number Numeric Keypad:** Configured `inputmode="numeric"` and numeric formats on the account number input field to force a clean, simplified number pad on mobile devices.
- **Conditional Credit Limit Input:** Restored the `#accCreditLimit` field nested inside a newly designed, labeled `#accCreditLimitField` container. The field features an absolute-positioned clear button and dynamically un-hides strictly for Credit Card accounts, maintaining layout consistency.

### Changed
- **Form Layout Harmonization:** Completely restructured the Add/Edit Account Form layout, rearranging inputs to follow a highly logical visual progression: Account Name, Institution/Bank, Account Number, Compact Type & Balance, Payment Due Date, Credit Limit, Min/Max Alerts, App Preset, and Connected Website URL.

### Fixed
- **Single-Quote Autocomplete Crash:** Patched `handleAutocompleteTyping()` to pre-escape apostrophes and single quotes (`\\'`) inside generated suggestions lists, resolving an inline handler evaluation syntax crash when selecting expense payees (e.g., "McDonald's" or "Kohl's").

## [1.6.3] - 2026-09-03

### Added
- **Mobile-Only Dynamic Alert Badges:** Integrated a responsive, color-coded alert badge inside mobile account cards, placed directly below the due date. The badge is hidden on desktop widescreen screens using Tailwind's responsive queries (`lg:hidden inline-flex`) and only activates when an account triggers a balance or debt threshold violation.
- **Supabase Alert Column Support:** Added the database-level schema columns (`min_balance_alert` and `max_balance_alert`) to enable alert configuration persistence and real-time syncing between devices.

### Changed
- **Whitelisted Database Payloads:** Restored `min_balance_alert` and `max_balance_alert` parameters to the permitted columns whitelist inside `saveAccountData()`, preventing API payloads from stripping out alert settings before writing to Supabase.
- **Robust State Hydration Guard:** Patched `fetchData()` to safely map and fallback to locally-cached alert thresholds when fetching fresh records, shielding active account configuration memory from being clobbered during background database syncs.
- **Unified Alert Evaluation:** Synchronized checking/savings limit gates and credit card debt threshold evaluations across both desktop and mobile viewports.

## [1.6.2] - 2026-09-02

### Added
- **Unified Controls Container:** Designed and integrated a card-styled controls wrapper container around the "Your Accounts" header, "New account" button, switcher toggle, and search inputs, matching the soft gradient background of your primary dashboard widgets.
- **Interactive Navigation Submenu:** Expanded the main menu (☰) "Return to Accounts" link into an elegant collapsible accordion list renamed to "Accounts." Selecting it reveals a dynamic submenu featuring "All Accounts" at the top, followed by a list of all active financial accounts sorted in their standard display sequence for rapid navigation.
- **Header Account Navigation Arrows:** Integrated Left and Right arrow buttons (◀ / ▶) in the sticky application header for swift click-to-cycle ledger transitions on desktop.

### Changed
- **Vertical Stack Controls Layout:** Repositioned the view switcher tabs and the active search input boxes to stack vertically on desktop screens, resolving layout squishing by allowing elements to expand to 100% card width.
- **Search Fields Consolidation:** Relocated the "Search transactions" input box up into the main Controls Container card alongside the account search bar. The active search input now toggles dynamically based on your selected view tab while the card height remains completely static.
- **Streamlined Transactions Headings:** Simplified the transaction history view titles by stripping out the dynamic month and year suffix labels (e.g., displaying as "Transactions", "Income", or "Expenses" instead of appending the month/year string).
- **Balances & Quick Action Card Consolidation:** Relocated the "+ Add Transaction" button inside the primary account details balances card, group-unifying all ledger actions (Portal launching, Edit Account, Current & Cleared Balances, and Add Transaction) into a single, cohesive vertical container.
- **Balances Card Styling Harmonization:** Upgraded the balances card to use the signature gradient background (`bg-gradient-to-br from-slate-50 via-white to-blue-50`), rounded corners (`rounded-3xl`), border weights, and visual shadows, perfectly matching the design language of your primary widgets.
- **Balances Card Desktop Height & Alignment:** Standardized the balances card to a matching `lg:h-[188px]` desktop height and appended `lg:!mt-0` to bypass empty-sibling parent margins, locking the card into a laser-straight horizontal alignment with the neighboring Account Summary card.
- **Symmetrical Card Parity:** Standardized the heights of the global Monthly Summary card, the new Controls Container, and the account-specific Monthly Summary card to a matching `lg:h-[188px]` to ensure perfect horizontal alignment on desktop viewports with zero visual jumps.
- **Responsive Anti-Whiplash Grid Gap:** Restructured the main grid layout gap to `gap-3 lg:gap-4`. This collapses the mobile vertical spacing between the stacked columns to exactly `12px` (matching the ledger's internal `space-y-3` vertical spacing), ensuring the bottom cards remain completely stationary with zero shifting during view toggles.
- **Flexible Account Summary Card Header Overhaul:** Overhauled the account-specific Monthly Summary card header from a rigid CSS Grid to a responsive Flex-Wrap layout container (`flex flex-wrap lg:flex-nowrap`). This ensures elements self-align perfectly on all screens and prevents layout/height distortions when the Credit Limit progress bar is dynamically hidden on cash or savings accounts.
- **Streamlined Header Metrics & Vertical Gaps:** Relocated the credit limit progress bar into the Account Summary card. Stacking elements vertically with a responsive middle-track alignment on mobile tightened the vertical gap between the header metrics and sub-cards to fit them beautifully inside the matching `188px` card boundary with zero overflow.
- **Enlarged Quick Actions & Symmetrical Alignment:** Scaled up the Launch Portal and Edit Account buttons (and corresponding text) to a highly tap-friendly size. Grouped them inside fixed `h-[42px]` rows so the top and bottom edges of the buttons align symmetrically with the top and bottom bounds of their enlarged Current and Cleared Balance text displays.
- **Active Month Dropdown Highlighting:** Replaced the legacy green/blue "Live" badges on the summary cards with a clean active-month border transition on the dropdown selectors themselves. The dropdown border dynamically paints royal blue when viewing the current month and returns to grey for past months, backed by an auto-`blur()` trigger to instantly strip focused keyboard ring outlines on selection.
- **Desktop Summary Header Alignment Polish:** Adjusted the desktop bottom-margin offsets (`lg:mb-1`) on both the credit limit progress bar and the month select dropdown wrapper to pull their bottom edges up to align cleanly with the baseline of your month and year text.
- **Account Type Filter Dropdown Conversion:** Replaced the row of account type filtering buttons with an elegant custom dropdown selector nested inside a unified filter container, matching the exact height, border design, and location of the transaction search inputs.
- **Chronological Dropdown Reversal:** Reversed the monthly summary selector dropdown sequence so that the most recent (current) active month floats at the very top of the options list, followed chronologically by past historical months.
- **Navigation Scroll Isolation:** Bound the mobile dropdown navigation container with `max-h-[calc(100vh-80px)]` and enabled `overscroll-contain` to isolate scrolling, ensuring touch swipes scroll smoothly through the accounts list instead of dragging the background page.
- **Carousel Animation Direction Alignment:** Rebalanced the exit and entrance slide physics parameters across desktop clicks and touch swipe gestures, ensuring that both clicks and touches slide current cards off-screen while the next chronologically enters from the physically expected direction with buttery-smooth responsiveness.
- **Hardware-Accelerated Carousel Restoration:** Restructured `#ledger-feed-panel` to reinstate the `#transactions-view` capture bounds and `#tx-view-content` hardware-accelerated transform elements to fully restore mobile touch-swiping and desktop transitions.

### Fixed
- **In-Memory Balance Syncing:** Restored a call to `renderAccounts()` inside the `home-transactions` and `activeAccountId` rendering branches of `toggleTxStatus()`. This ensures that toggling a transaction status between Pending ("P") and Cleared ("C") inside any active view immediately repaints and updates your main Accounts home page cards and cleared balances without requiring a manual page refresh.
- **Signed-Math Alert Thresholds:** Standardized asset and credit card liability checks using raw signed balances directly rather than converting values to positive absolute numbers. Dropping below a negative minimum threshold (e.g. going from -$500 to -$1200 on an alert set to -$1000) now correctly triggers a high-priority "High Debt" alert with a red warning badge.
- **Dynamic Minus Symbol Placement:** Injected a localized alert currency formatter that positions negative signs inside the currency block, outputting as "-$1,000.00" rather than "$-1,000.00" inside the dashboard and dialog UI feeds.
- **Account Ledger Transaction Sorting:** Aligned the transaction sorting pipeline inside individual Account Details views to match the main Transactions View. The ledger now runs your standard comparison sorting engine, correctly bubbling Pending transactions to the top of the card feed, followed by Cleared transactions ordered by date (newest first) and creation timestamp, instead of incorrectly grouping cleared items first regardless of date.
- **Right Column Layout Wrap:** Restored the right column's dedicated layout section, resolving a layout wrap bug that forced the active accounts list and filter bar to slip under the cockpit sidebar on desktop views.
- **Dynamic Card Visibility & ID Conflicts:** Corrected a duplicate ID conflict on the account Monthly Summary card (restoring its unique `id="account-monthly-summary"`) and removed its default `hidden` class to allow the desktop cockpit sidebar teleportation engine to function cleanly.
- **Horizontal Transition Twitching:** Injected `scrollbar-gutter: stable;` on the root `<html>` element to ensure a stable layout margin for scrollbars, permanently correcting horizontal layout shifting when transitioning between varying content-height panels.
- **Fatal ReferenceError script crash:** Patched `renderMonthlySummary()` to completely remove the dead `liveBadge` checker block, resolving a fatal `ReferenceError` script crash that froze dashboard rendering when toggling tabs.
- **Dashboard Sync Hijack Guard:** Updated `showHomeAccounts()` and `showAllTransactions()` to explicitly clear the active account context on home tab switches (`activeAccountId = null`). This prevents background real-time sync processes from hijacking the view and drawing ledger panels over the main landing dashboard.
- **Transition Flash Remediation:** Patched `showTransactionsView()` to synchronously hide the credit limit progress bar container immediately upon initiating an account switch, preventing the previous account's credit metrics from flashing on-screen during network data retrieval.
- **Missing Global State and App Initialization Restored:** Resolved a compilation state loss during refactoring by un-nesting modal structures and recovering crucial global state trackers (including `plannedTransactions` and `alert state` triggers), successfully un-hiding and rendering all custom dashboard widgets and modals.

## [1.6.1] - 2026-09-01

### Added
- **Interactive Account Summary Sub-Filters:** Enabled full month-scoped transactional filtering on the ledger view. Clicking **Income** filters the list to show only income for the selected month, clicking **Expenses** isolates expenses, and clicking **Remaining** instantly resets the filter to display all transactions again.
- **Account Live Badge:** Added a matching "Live" status badge inside the account-specific summary that automatically shines when browsing the current active month, ensuring perfect parity with the global landing view.

### Changed
- **Symmetrical Summary Card Overhaul:** Re-aligned every element of the **Monthly Summary** and **Account Summary** cards to be completely identical in padding (`p-5`), text sizes, spacing, and icon positions. Toggling between dashboard views now renders seamlessly with zero layout shifting or text jumps.
- **Optimized Web View Layout:** Refactored the desktop grid inside the Account Details view so the newly standardized Account Summary card takes up the two left columns, while the action buttons (Launch Portal, Edit Account) and balances cleanly occupy the right column.

### Fixed
- **Tighter Ledger Top Spacing:** Decreased the vertical space above the Account Summary card in the Account Details ledger view to establish a cleaner, flush, and professional appearance.

## [1.6.0] - 2026-09-01

### Added
- **Planned Transactions Widget Engine:** Deployed a brand-new planned/recurring transaction schedule system. Renders as a beautiful static sidebar card on desktop and triggers an elegant slide-up modal drawer on mobile viewports. Clicking a scheduled item instantly pre-fills the standard ledger form with type, amount, and payee details for rapid manual posting.
- **Consolidated Navigation Menu (☰):** Added an absolute-positioned floating dropdown menu to standard headers, replacing the crowded mobile buttons. Dynamically displays viewport-specific links including "+ Add Transaction", "Return to Accounts," and "Planned Transactions."
- **Interactive Account-Specific Monthly Summary:** Configured the Account Details monthly summary blocks to act as live, interactive sub-filters. Tapping **Income** filters the ledger to display only income transactions, tapping **Expenses** displays only expenses, and tapping **Remaining** clears the filter to repaint the entire ledger instantly.
- **Context-Aware Month Selection:** Integrated a secondary, localized month-selection dropdown within the active account details panel, allowing users to browse historical ledger trends and account-specific metrics on the fly.

### Changed
- **Anti-Whiplash Dashboard Grid Layout:** Overhauled the desktop landing page into a unified, three-column CSS grid. The left two columns act as a permanent static financial cockpit (housing Monthly Summary and Widgets), while the right column acts as a dynamic action feed (Accounts, search, or detailed ledgers). toggling views on desktop no longer shifts or resizes columns.
- **Dual-Column Account Details Header:** Restructured the top section of the Account Details view on desktop. The account-specific Monthly Summary takes up the left two columns, and the action buttons (Launch Portal, Edit Account) and bold, enlarged balances (Current and Cleared Balance) are grouped into a symmetrical 2x2 quadrant layout in the right column.
- **Dynamic Header Text Synchronization:** Upgraded the sticky navigation header to display global branding ("Home Wealth" / "Your Money. Your Way.") on main menus, and dynamically transitions to present active bank, institution, and masked account number details when browsing individual ledgers.

### Fixed
- **Excess Vertical White Space:** Decreased the padding and vertical margins above the Account Summary card in the Account Details view to establish a tighter, flush, and cohesive visual hierarchy.
- **Mobile Render Interceptions:** Patched navigation class transitions to auto-hide background layout columns on mobile devices, preventing vertical layout bleed-through and background scroll lockouts.

## [1.5.3] - 2026-08-31

### Added

- **Persistent Ledger Scrolling:** Configured the transaction detail view rendering pipeline with a scroll-preservation parameter. Background data updates (like toggling status or submitting minor edits) now lock your vertical scrolling position in place, ending disruptive page-jump resets.

### Changed

- **Status Terminology Rebrand:** Shifted the application's vocabulary from "Reconciled" to "Cleared" across transaction status dropdowns, card states, and hover tooltips to mirror the cleared-balance aggregates on the dashboard.
- **P/C Status Toggle:** Replaced transaction card action badges from "P/R" (Pending/Reconciled) to "P/C" (Pending/Cleared) for faster visual scanning.

### Fixed

- **P/C Toggling & Balance Sync:** Corrected the underlying transaction status toggle routine to smoothly transition status updates between Pending and Cleared, ensuring real-time in-app balances and database records remain in perfect harmony.

### Removed

- **Unused Icon Utility Snippets:** Pruned the legacy `PWA_SERVICE_WORKER_SNIPPET` string block from `make_icons.py` to streamline the asset pipeline and prevent local syntax compiling errors.

### Refactoring & Architecture

- **Global State Hoisting:** Hoisted four floating autocomplete and keyboard navigation state properties up to the top of Phase 1 (Core Utilities & State Management) in `index.html`.
- **Database Helper Realignment:** Relocated localStorage and Supabase data synchronization functions (`loadLabelTree()`, `saveLabelTree()`, and `saveLabelNatures()`) out of utility blocks and down into Phase 2 (Data & API Layer).

## [1.5.2] - 2026-08-31

### Added

- **Interactive Image Rotation:** Integrated 90-degree left (↺) and right (↻) rotation controls inside the receipt attachment Cropper modal. This allows mobile and desktop users to correct sideways photo orientations on-the-fly, modifying the output canvas pixel data before saving and uploading.

### Changed

- **Transaction Modal Field Reordering:** Restructured the Add/Edit Transaction modal's form layout to follow a highly logical and intuitive data-entry flow:
  1. *Type & Amount* (including inline Split toggles and formula evaluations)
  2. *Account Selection* (including dynamic Transfer target fields)
  3. *Payment Type* (including Check number triggers)
  4. *Date & Status*
  5. *Payer / Payee*
  6. *Labels* (multi-select list with dynamic suggestions)
  7. *Description* (optional notes)
  8. *Attachments* (Receipt/Camera upload files)
- **Mobile Header Banner Scaling:** Increased the overall size, vertical padding, and height of the top navigation header banner on mobile devices to establish a more prominent, spacious, and readable interface presence.
- **Tagline Wording Refinement:** Updated the global tagline across both the dark splash screen and header components to **"Your Money. Your Way."**, replacing legacy "Your money, in one place" or "Your money in your place" subtitles.

## [1.5.1] - 2026-08-31

### Changed

- **Home Wealth Rebrand:** Transitioned the application's global identity from "Household Budget" to "Home Wealth" across the document title, manifest naming, and workspace header fields.
- **Royal Cobalt UI Theme:** Configured a custom Tailwind utility theme using cobalt blue hues (#2552d0) to skin the application's buttons, highlights, and headers.
- **High-Fidelity Header Logo:** Swapped out the stock SVG house header outline for an inline rendering of the custom `icon-192.png` brand emblem.
- **Bespoke PWA Splash Screen:** Built a dark midnight-slate (`#020617`) initial brand presentation card with a centered `icon-192.png` emblem, glowing radial background, and stylized typography.

### Fixed

- **OS-to-HTML Transition Sizing (Flicker Guard):** Sized the HTML brand icon to exactly `192px` to match native OS mobile launcher grids and boot frames. Added a dynamic opacity blossom script to hold visual rendering until local cache decoding completes, eliminating cold-launch handoff blinks.
- **Header Layer Bleed-Through:** Applied an absolute high stacking priority (`z-index: 9999`) to the brand splash container, completely masking the sticky navigation header and accounts dashboard during the introductory timer.
- **Instant Refresh Protection:** Migrated the `sessionStorage` bypass state validation to trigger instantly upon document initialization, guaranteeing subsequent page reloads bypass the intro sequence.
- **Cinematic Transition:** Extended the splash screen exit animation to a smooth `1.2s` cross-fade sweep, giving a polished transition straight into the financial ledger view.

## [1.5.0] - 2026-08-30

### Added

- **Progressive Web App (PWA) Framework:** Fully deployed `manifest.json` launch vectors to enable fullscreen standalone launching on mobile homescreens.
- **Smart Network-First Service Worker:** Built a background `sw.js` network interception layer. Employs a network-first falling back to cache strategy, ensuring local offline availability while allowing live developer deployments to load immediately upon device sync.
- **Accidental Double-Logging Protection:** Integrated a real-time transaction scanner inside the save submission pipeline. When creating or editing transactions, it scans local memory for existing matches within a 7-day window having the same account, payee/payer, and amount, safely excluding the transaction currently being edited from its own duplicates search. Triggers a descriptive confirmation modal to prevent accidental double-logging.
- **Physics-Based Swipe Gestures:** Upgraded detailed transaction card navigation to use real-time coordinate tracking on horizontal drags. Delivers a premium native look and feel where card contents translate smoothly under-finger.
- **Elastic Rebounds & Commit Thresholds:** Configured a smart 100px drag boundary. Swipes left-off below the threshold trigger elastic snapbacks to center, while dragging past the boundary slides the card completely off-screen and sweeps the new ledger card into view.
- **Animated View Carousel swiping:** Embedded a hardware-accelerated "peek-and-slide" transition wrapper around the detailed transaction scrollable body. Swiping or arrowing across accounts slides the active card out, teleports the hidden framework to the opposite viewport boundary, and slides the next ledger cleanly into focus.
- **Multi-Device Swipe & Arrow Key Cycling:** Programmed a horizontal navigation system for account details views. Desktop users can cycle accounts instantly using Arrow Left/Right keys, while mobile users can horizontally swipe across transaction feeds to transition smoothly from one active ledger to another.
- **Sticky Top Navigation Banners:** Configured both the main accounts dashboard and detailed transaction headers with Tailwind's `sticky top-0 z-40` properties. This locks essential action buttons—like returning to accounts and logging new transactions—firmly to the top of the viewport during long scroll sessions.
- **Global Smart Scroll-on-Focus:** Deployed a centralized `focusin` event delegation pipeline that automatically detects when a text input or textarea is selected. On mobile devices, it waits 180ms for the virtual keyboard to slide open and then smoothly scrolls the active field to the center of the visible screen, keeping the input completely visible.
- **Global Receipts Button on Cards:** Ported the inline attachment link utility to the main Transactions view tab cards. Users can now view and open attached receipt PDFs or cropped screenshots directly from any transaction card without opening the modal first.

### Fixed

- **Scroll Positioning:** Reset viewport scroll position to top on all view and tab transitions.

## [1.4.5] - 2026-08-28

### Added

- **Multi-Device Cloud Syncing:** Connected category configuration saving and loading directly to Supabase `settings`, establishing real-time synchronization of the master label tree and defaults across all desktop and mobile devices.
- **Mobile Touch-Dragging Support:** Deployed comprehensive touch event wrappers (`touchstart`, `touchmove`, `touchend`) leveraging ES6 array destructuring for safe coordinate calculation, enabling premium drag-reordering feedback on all mobile touchscreens.
- **On-the-Fly Alphabetical Sorting:** Configured root directories and child subcategories to sort purely alphabetically on rendering, bypassing Postgres JSONB binary storage sorting constraints to keep category layouts perfectly structured.
- **Unified Confirmation Modal Pipeline:** Integrated all prompt and delete modals into a single, bulletproof queue using global callback parameters, preventing visual overlap bugs and duplicate execution of click listeners.
- **Mobile Layout & Scroll Lock:** Added body freezes on modal opens and active dragging sessions to isolate touch overlays and prevent background page viewport scrolling.

### Fixed

- **Tailwind Modal Stacking (z-index):** Swapped Tailwind's non-compiling `z-70` class for an explicit inline style `style="z-index: 80;"` on `#confirm-modal`, ensuring confirmation dialogs float cleanly over the label picker.
- **Legacy Filtering Reference:** Replaced the dead `selectedTagFilter` check in the transaction empty-state with `activeTagFilters.length > 0`, ensuring accurate filtering feedback.
- **Cleaned Legacy Elements:** Streamlined `deleteTx` UI calls by removing the redundant second argument from both render engines.

## [1.4.4] - 2026-08-26

### Added

- **Unified Clear Buttons (×):** Deployed dedicated, absolute-positioned inline clearing buttons across 14 typable inputs. Users can instantly clear searches, transaction descriptions, payees, account configurations, and split details with a single click.
- **Math Character Typing Restrictor:** Added real-time character-filtering (`restrictToMathInput`) that strips out alphabetical characters on-the-fly while typing in financial fields, allowing only digits, decimals, and math operators.
- **Visual Validation Highlights:** Configured financial inputs to dynamically highlight their borders in red if a mathematical expression fails to evaluate, supported by active submit guards that block saving until expressions are corrected. Tapping into a red input instantly resets its styling.

### Changed

- **Spinner-Free Financial Inputs:** Converted Initial Balance, Credit Limit, and alert thresholds from `number` to `text` inputs. This permanently removes ugly, native browser up/down penny arrows while preserving custom math evaluation and triggering decimal mobile keyboards via `inputmode="decimal"`.

### Fixed

- **Mobile Keyboard Suppression:** Moved touch sequence interception (`handleLabelTouchStart`) to the parent container wrappers of all tag inputs. Double-tapping anywhere near the label field now successfully dismisses the mobile keyboard before the hierarchical picker modal slides open.
- **Ghost Wrap Input Line Bugs:** Shrank the minimum-width constraint of autocomplete label inputs to `8px`, allowing tags and search boxes to wrap naturally without creating empty trailing lines.
- **Cleaned Legacy Elements:** Pruned redundant, overlapping clear-button evaluations inside the account modal initialization and deleted the dead `handleSmartLabelInputClick` function.

## [1.4.3] - 2026-08-26

### Added

- **AND/OR Match Mode Toggle:** Added a "Match All (AND)" interactive checkbox to both the Account Details and Global Transactions label filter containers. Users can now seamlessly toggle between finding transactions matching *any* selected label (OR matching) or only transactions that contain *every* selected label (AND matching).
- **Global Transactions Label Filtering:** Ported the hierarchical multi-select label filter to the global Transactions view page, positioned beautifully above the primary search input box. Includes dedicated auto-complete typing suggestions, arrow keyboard navigation, and click-away auto-dismiss overrides.
- **Symmetric Spacing Polish:** Balanced vertical margin gutters across both views. Fixed mobile overlapping issues by introducing a collapsible bottom margin (`mb-4 lg:mb-0`) on the Monthly Summary card and aligning the static "+ Add Transaction" button within the main page wrapper.

### Fixed

- **Modal Stacking & View Nesting Leak:** Sealed a structural unclosed `</div>` leak in the receipt preview container (`#receiptPreview`). This successfully unnested subsequent modals (Image Cropper and Label Picker) from `#tx-modal`, restoring correct visual rendering and click interactions across the Account detail views.
- **Forced Inline Display Overrides:** Injected explicit inline layout overrides (`display: flex !important` and `display: none !important`) on label picker modal open/close actions, permanently bypassing compiled Tailwind stylesheet and layout caching conflicts.
- **Split Array Suffix Trimming Crash:** Patched `resolveShortLabelToSerialized` to safely grab string segments from split arrays prior to applying `.trim()`, preventing a silent crash on tag resolutions.
- **Root-Directory Folder Comparison:** Corrected the Expense branch evaluator inside `renderLabelNode` from a strict array comparison (`currentPathArray === "Expenses"`) to an index tracker (`currentPathArray.indexOf("Expenses") === 0`), stabilizing the "Must / Need / Want" nature selectors.

## 1.4.2 - 2026-08-25

### Added
- **Mobile Numeric Keypad Enforcement:** Embedded the `inputmode="decimal"` attribute across all financial inputs to force mobile browsers (iOS and Android) to automatically launch a clean, decimal-ready numeric keypad on tap, minimizing mobile input friction.
- **Master Default Nature Editing:** Expanded the "Edit Labels" panel to display "Must / Need / Want" nature toggles next to all Expense categories. Toggling these options now updates your master default configurations in local storage upon saving.
- **Split Multi-Select Color-Coded Chips:** Overhauled split rows to render selected tags as gorgeous, color-coded interactive pills/chips with a delete "x" button directly inline, perfectly matching the look and feel of the primary transaction form.
- **Normal Transaction Label Double-Click Trigger:** Integrated double-click (`ondblclick`) to open the full hierarchical label tree sub-modal inside the main transaction labels input field for maximum desktop accessibility.

### Changed
- **Horizontal Split View Layout Overhaul:** Re-aligned the split row grid to display Labels and Amount inline on the top row, and Description full-width on the bottom row. This offers massive horizontal space, prevents cramped input lines, and ensures uniform label header heights.
- **Amount Input Keypads Optimized:** Upgraded the main transaction amount input (`txAmount`), split transaction row amounts (`data-split-amount`), cleared balance adjustment fields (`clearedBalanceInput`), and account creation parameters—including Initial Balance (`accBalance`), Credit Limit (`accCreditLimit`), Minimum Alert (`accMinBalance`), and Maximum Alert (`accMaxBalance`)—to trigger the decimal keypad while perfectly preserving your custom in-app mathematical formula evaluation engine on field blur.
- **Tightened Layout Padding:** Re-engineered the tag containers to use the CSS `contents` layout behavior, allowing chips and input boxes to wrap elegantly word-by-word, eliminating the empty trailing space and "ghost line" wrapper heights.

### Fixed
- **Label Nature Inheritance:** Configured `getDefaultNatureForPath` to query your active, live `labelNatures` state instead of fallback defaults, ensuring newly created labels automatically inherit parent category natures on-the-fly.
- **Inline Selector Evaluation:** Resolved an array-to-string evaluation bug in `renderLabelNode` by correctly evaluating the root of the folder path array (`currentPathArray.at(0)`) to ensure the inline type selectors render reliably under Expenses.
- **Label Tree Modal Stacking (z-index):** Fixed a visibility issue where double-clicking the split fields opened the label tree picker underneath the active transaction modal. Adjusted the picker's stacking wrapper inline style to `z-index: 60`, forcing it to slide cleanly on top of the `z-50` transaction overlay.
- **Split Autocomplete Dropdown Overlaps:** Resolved a stacking context bug where Row 1's autocomplete suggestion boxes would get buried under Row 2's inputs. Applied dynamic active row hovering classes `relative focus-within:z-20 hover:z-20 transition-all` to float the active row cleanly above its siblings.
- **Clean Autocomplete Comma Joining:** Cleaned up selected autocomplete insertion logic, joining items with comma-spaces cleanly and completely dropping trailing commas from the end of the input fields.

## [1.4.1] - 2026-08-23

### Added
- **Split View Label Tree Modal Integration:** Configured split transaction rows to support double-clicking (`ondblclick`) a split "Type to search" input field to instantly pop open the full recursive category tree picker.
- **Multi-Device Configuration Import Hook:** Embedded a dynamic URL parameter detector (`?importConfig=...`) inside the initialization routine. Decodes and auto-loads custom categories and natures via a single magic link, enabling seamless sync from computer to mobile devices.
- **Targeted Sibling-Branch Tree State Restoration:** Extended the label picker modal to track active split row selection indices, dynamically pre-checking existing split tags when loading the tree, and cleanly routing selected categories back to the corresponding split row.

### Changed
- **Decoupled Category Tree Selection & Navigation:** Swapped the legacy `<label>` elements for `<span>` nodes inside the category renderer. Restricted category selection strictly to direct checkbox clicks, configuring parent category text clicks to toggle folder expansion without accidentally checking boxes.

### Fixed
- **Main Label Input Split View Visibility:** Patched the split editor toggle to look up `'tx-labels-field'` instead of `'tx-tags-field'`, ensuring the main labels input area hides cleanly when split mode is active.
- **Split Autocomplete Dropdown String Interpolation:** Swapped single quotes with backticks in the split autocomplete helpers to enable successful query parsing and dynamic UI rendering.

## [1.4.0] - 2026-08-23

### Added
- **Interactive Drag-and-Drop Category Reordering:** Enabled users to click and drag categories strictly within their sibling branches (e.g. reordering items under "Food" without spilling into "Housing") using a visual grab handle (`⠿`). Added dynamic blue drop insertion lines (`.drag-over-above`, `.drag-over-below`) and row opacity adjustments (`.dragging`) to provide premium visual feedback during drag operations.
- **Dynamic Action Footer Button Swapping:** Replaced the standard selection footer buttons ("Clear All" and "Apply") with context-aware session triggers ("Cancel Edits" and "Save Edits") when switching into Edit Labels mode.
- **Deep-Snapshot Edit Session Rollbacks:** Configured `cancelCategoryEdits()` and `saveCategoryEdits()` to capture automatic deep copies of the category tree (`labelTree`) and defaults when entering edit mode, allowing users to safely discard or commit all adds, renames, deletes, and reorders in a single click.
- **Expand / Collapse All Tree Exploration:** Integrated dual helper actions (`📂 Expand All` and `📁 Collapse All`) under the search bar to dynamically traverse and toggle the expansion state of every subfolder directory in the picker instantly.
- **Custom App Prompt & Confirm Modals:** Engineered self-contained, responsive Tailwind prompt (`#custom-prompt-modal`) and confirm (`#confirm-modal`) cards to handle renames, additions, and deletions elegantly, fully replacing native browser `window.prompt()` and `window.confirm()` calls which were disabled in sandboxed/iframe previews.
- **Infinite Recursive Tag Nesting:** Migrated the category tree structure from a rigid, fixed three-level layout to a fully recursive object-nested hierarchy. Users can now subdivide any category to unlimited depths (e.g., creating `Expenses -> Food -> Groceries -> Produce`).
- **Hierarchical Label Tree Schema:** Seeded the master multi-level category configuration (`DEFAULT_LABEL_TREE`) in memory, reflecting the exact taxonomy of your spreadsheet.
- **User-Defined Default Natures:** Integrated default expense types supporting **Must**, **Need**, **Want**, and **N/A** classifications. Configured them to load and persist inside `localStorage` so they can be managed dynamically without hardcoding.
- **Database Suffix Serialization Utilities:** Implemented robust serialization utilities (`parseLabelString` and `pathToLabelString`) to pack hierarchical labels and their active natures into flat, database-friendly strings (e.g., `"Expenses-Food-Groceries|Need"`), ensuring 100% backward compatibility with your existing Supabase columns.
- **Four-Tiered Budget Natures:** Added support for **Must**, **Need**, **Want**, and **N/A** classifications with global user-defined configurations and dynamic default pre-checks.
- **Dynamic Local Storage Self-Healing Migration:** Implemented `migrateTreeRecursive` to dynamically detect and convert legacy flat-array database configurations in client local storage into nested-object schemas, preventing index-rendering corruption (i.e., categories rendering as 0, 1, 2).
- **Dynamic Mode-Indicator Headers:** Configured the modal subheader to seamlessly transition its subtitle from `"Need to edit labels?"` to `"Ready to select labels?"` when toggling between select and edit modes.

### Changed
- **Minimalist Category Typography:** Completely stripped the folder icon (`📁`) from parent directory trees in favor of a clean chevron arrow expansion toggle (`▶` / `▼`), maintaining leaf-level label tags (`🏷️`) for maximum aesthetic balance.
- **Visual Badge Redesign:** Completely stripped the `#` hash character prefix from all transaction views. Restyled transaction cards, split transaction details, and account details filter chips to display as elegant, color-coded, border-rounded badges.

### Fixed
- **Root-Path Evaluator array-to-string checks:** Resolved a bug in `getDefaultNatureForPath` and `renderLabelNode` where evaluating `currentPathArray === "Expenses"` failed due to direct array-to-string comparisons, stabilizing Must/Need/Want category natures.
- **Force-Select State Restoration:** Patched a state synchronization bug inside the Save/Cancel pipeline by passing an explicit `forceState = false` override to `togglePickerEditMode()`, preventing loops that locked users in edit mode.
- **Selected Month Summary:** Updated `setSelectedSummaryMonth(this.value)` function so that it updates the `#home-view-title` and re-filters and repaints the transaction history cards using `showAllTransactions()` and `renderAllTransactions()`.
- **Restored Standard Utility Block:** Recovered the omitted frontend parsing functions (`getLabelDisplayName` and `getLabelDisplayPath`) and modal render routines (`renderSelectedLabelsPreview` and `removeLabelFromPreview`) to resolve immediate modal load and transaction screen crashes.

## [1.3.2] - 2026-08-22

### Added
- **Built-In Amount Field Calculator:** Upgraded the primary transaction amount (`#txAmount`) and dynamic split row amount (`[data-split-amount]`) fields from HTML `number` to `text` inputs to support raw mathematical expressions (e.g., `45 * 1.0825` or `12.50 + 3.40 + 9.99`). Attached `blur` listeners to trigger a secure, sanitized expression parser that resolves calculations into formatted decimals without executing unsafe scripts.
- **Dynamic Split Remainder Math Evaluation:** Overhauled `updateSplitRemainder()` to parse active, incomplete mathematical strings on-the-fly while typing, allowing the automatic split remainder calculations to compute continuously without throwing errors.
- **Press-Enter Submission Guard:** Implemented an automatic math evaluation check at the start of `handleTxSubmit(e)`. This ensures that mathematical expressions are resolved immediately upon form submission if a user presses Enter instead of tabbing away from the input, preventing native `parseFloat` truncation issues.

### Fixed
- **Ghost HTML Text Rendition:** Resolved a rendering bug in the Add/Edit Transaction Modal where a duplicate, copy-pasted `class="..."` attribute string below the Amount input was rendering as raw visible text.
- **Savings Account Preset Value Mismatch:** Fixed a mismatch in `autoSelectPaymentMethod()` where selecting a "savings" account attempted to assign a non-existent `'transfer'` value to the payment method dropdown, correcting it to the valid `'bank_transfer'` option.
- **Global Function Scope Resolution:** Restored the missing global reference to `updateSplitRemainder` by extracting it and its helper utilities from nested scopes and placing them back in the top-level script space.

### Refactoring & Architecture
- **Architectural Phase Alignment:** Re-aligned misplaced functions across the five-phase script architecture to restore organizational sanity:
  - Moved `fetchTransactions()`, `uploadReceiptFiles()`, and `toggleTxStatus()` to **Phase 2: Data & API Layer**.
  - Moved pure utility functions (`isTransferPartnerTransaction()`, `compareTransactions()`, `normalizeAccountType()`, `accountMatchesTypeFilter()`, `parseTagInput()`, `getTransactionTags()`, and `getSplitDetails()`) to **Phase 1: Core Utilities**.
  - Relocated dynamic UI interaction event triggers (`addSplitRow()`, `removeSplitRow()`) to **Phase 5: Event Handlers**.
- **Global State Sanitization:** Deprecated the redundant `window.currentAccountId` tracking variable, centralizing all account details and view routing handlers strictly onto the single, hoisted `activeAccountId` state.

## [1.3.1] - 2026-08-21

### Fixed
- **External Portal Integregation Functionality:** Still not perfect but many sites, in particular those the Bladow family is most interested, were not working to launch the app. Incorporated using links to the apps in the Google Play Store to get to the apps on mobile device. 
- **Automatic Top-launch of Modals:** Arranged it such that the view of a modal upon launch is always at the top of the modal.
- **Tall Modal Windows:** Tall modals overflowed off-screen. Added inner content <div>.

### Changed
- **Account Overview Card Polish:** Removed the "Edit Account" and "Launch" buttons from account overview cards on main Accounts view in order to clean up the appearance.

## [1.3.0] - 2026-08-21

### Added
- **External Portal Integration:** Added an optional external_link column in the Supabase accounts table, with dedicated form fields supporting standard URLs or native app URI protocols (e.g., chase://, venmo://) to trigger native mobile application launching.
- **Quick Connect App Preset Selector:** Integrated an alphabetized dropdown list containing 25+ popular financial and P2P app presets inside the modal, automatically copying correct deep-link schemes to speed up configuration.
- **Credit Limit & Remaining Balances:** Created a dynamic credit remaining ratio ($x / $y) and color-coded visual progress bar (Blue: healthy ≥ 50%, Amber: warning 20-49%, Red: danger < 20%) on the details overview card.

### Fixed
- **Instant Detail View Repainting:** Refactored handleAccountSubmit() to detect if updates are submitted from 'transactions-detail' view, immediately calling showTransactionsView() to refresh the header card elements without requiring a manual page reload.

### Changed
- **Overview Card Layout Polish:** Restructured the Transactions View header layout to separate action buttons (Edit Account and Connected Portal) into a clean, border-separated footer block at the bottom of the card.

## [1.2.3] - 2026-08-21

### Added
- **Payment Due Date for Debt Accounts:** Integrated a conditional due date entry system restricted to "Credit Card" and "Loan" types, persisting this selection via a new `due_date` column in the Supabase `accounts` table.
- **Custom Calendar Selection Modal:** Built an inline, high-performance modal with a 1-31 grid layout, utilizing inline styling to ensure it renders on top of parent modals without z-index conflicts.
- **Dynamic Due Date Card Stacking:** Standardized dashboard account cards to render the monthly due date on its own dedicated line below the institution name for effortless visual scanning.

### Removed
- **Transfer View Payer/Payee Inputs:** Deprecated and hid the manual "Payer/Payee" form input when a transaction is set to "Transfer" to reduce form fatigue and eliminate manual input errors.

### Fixed
- **Automated Transfer Ledger Labels:** Rewrote the database transaction submission block to programmatically map opposing account names to each ledger's payee records, completely resolving a bug where incoming transfers showed self-referential payee names.

### Changed
- **Dashboard Account Cards Layout Overhaul:** Re-architected account card headers to group the Account Name, Account Type, and Account Number inline on a single line, stripping all distracting parentheses for a highly clean, professional header aesthetic.
- **Transaction Modal Layout Overhaul:** Swapped the columns inside the Type & Amount section so that "Type" resides on the left and "Amount" on the right for a more intuitive natural reading flow.
- **Inline Split Toggle Integration:** Repositioned the "Split" checkbox inline with the "Amount ($)" label, using a horizontal flex container to align the label to the left and the checkbox to the far right.
- **Grid Alignment & Vertical Height Synchronization:** Standardized the heights of form inputs and select elements inside the modals to ensure flush, perfectly aligned grid lines.
- **Delete Confirmation Standardization:** Unified the transaction deletion confirmation prompt to always ask "Delete this transaction?" across all delete actions.

### Refactoring & Architecture
- **`deleteTx` Function Streamlining:** Simplified the global `deleteTx` function signature by removing the redundant `description` parameter. Cleaned up the HTML render templates in both list views to only pass the transaction `id`.

## [1.2.2] - 2026-08-20

### Added
- **Custom Autocomplete Suggestion Overlays:** Replaced the native HTML `<datalist>` elements with dynamic, absolute-positioned Tailwind containers (`#desc-suggestions-custom` and `#payee-suggestions-custom`) that float cleanly below input fields and align perfectly with the app's visual style.
- **Outside Click Auto-Dismiss:** Added a global document click listener that automatically closes active autocomplete suggestions whenever you click anywhere outside the active input field.

### Fixed
- **Mobile Input "Field Covered" Bug:** Solved a critical Android/Chrome layout bug where the native mobile browser would draw the datalist options card directly over the input field, hiding what was being typed.
- **Mobile Autofill "Ghost" Overlaps:** Explicitly disabled native autocomplete (`autocomplete="off"`) on form inputs, completely eliminating Chrome's ugly, semi-transparent text preview previews that clashed with existing text.
- **Split Transaction Payee Visibility:** Corrected the split transaction initialization block so that checking the "Split" toggle no longer incorrectly hides the crucial Payer/Payee field.

## [1.2.1] - 2026-08-20

### Refactoring & Architecture
- **Function Inventory & Reorganization:** Categorized and reordered all functions into five logical groupings (Utilities, Data/API, UI Rendering, Modals, and Event Handlers) for significantly improved maintainability.
- **Duplicate Code Removal:** Eliminated redundant function declarations from the script.
- **State Management:** Centralized and hoisted global state variables to the top of the script block. Resolved a launch crash by properly declaring missing global variables (`selectedSummaryMonth`, `filteredTransactionsLookup`, etc.) before initialization.

### Added
- **Dynamic Autocomplete suggestions:** Overhauled the Description and Payer/Payee auto-fill dropdowns so they remain hidden until you start typing, and only query previous entries containing that specific letter combination.
- **Split Transaction Autocomplete:** Expanded the new dynamic autocomplete logic to individual split row description fields using efficient parent event delegation.

### Fixed
- **In-Memory Balance Syncing:** Resolved an issue where toggling a transaction status between Pending ("P") and Reconciled ("R") inside the detailed account view failed to update cleared balances in the main Accounts view without a manual page refresh.
- **Split View Payee Layout:** Fixed a layout bug where enabling split allocations on a transaction modal incorrectly hid the main Payer/Payee field.

## [1.2.0] - 2026-08-19

### Added
- **Account Archiving Feature**: Introduced a safety check during account deletion that checks for active transaction history, safely archiving accounts (`is_archived: true`) instead of hard-deleting them when history exists.
- **Active Account Filtering**: Filtered active account lists to exclude archived accounts while preserving all underlying data integrity.

### Fixed
- **Historical Transaction Rendering**: Updated transaction card lookups to gracefully reference closed accounts and append an `[Archived]` tag to their display names, preventing generic fallbacks.

## [v1.1.2] - 2026-08-19

### Added
- Feature to edit account Cleared Balance with auto-adjustment or initial balance update options.
- Added deterministic transaction ordering by pending/reconciled status, date, and creation timestamp

### Fixed
- Rounded currency calculations and input values to 2 decimal places to eliminate floating-point precision bugs.
- Fixed UI state sync so deleting/editing transactions immediately updates the Accounts card grid and alert badges.

## [1.1.1] - 2026-08-18
- Added split transactions with multiple tagged allocations, descriptions, remainder amounts, validation, and expandable card details
- Included split tags in the account Filter by Tag list alongside standard transaction tags
- Added persistent image and PDF receipt uploads through Supabase Storage
- Added mobile Choose File and Take Photo receipt actions with in-page validation messages
- Added P2P and Web Payment payment types
- Added in-account account editing
- Improved transfer direction clarity, sister-transaction navigation, and paired transaction styling
- Refreshed responsive desktop and mobile layouts for headers, summaries, search, cards, and transaction controls
- Added immediate transaction list refresh after deletion
- Added month-scoped budget summary with income, expense, and remaining balance totals
- Improved monthly filtering and current-month Live status
- Excluded transfer partner transactions from real income and expense totals
- Added quick P/R status toggles and delete actions to transaction cards
- Updated transfer styling and monthly transaction grouping

## [1.0.0] - 2026-08-18
- Initial household budget app release
