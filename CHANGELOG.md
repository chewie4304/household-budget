# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

## [1.2.4-dev] - 2026-08-21

### Added
- **Credit Limit Data Collection:** Added a `credit_limit` numeric column to the Supabase `accounts` table, complete with a conditional form field inside the modal that appears strictly for "Credit Card" accounts.
- **Credit Remaining & Utilization Tracker:** Implemented a dynamic credit remaining ratio ($x / $y) and visual progress bar inside the Account Details Overview Card for credit card accounts.
- **Dynamic Progress Bar Color Coding:** Visual indicators color-code utilization based on remaining percentage thresholds: Blue (healthy, ≥ 50%), Amber (warning, 20% to 49%), and Red (critical debt/low credit remaining, < 20%).

### Changed
- **Overview Card Structure Polish:** Rearranged the visual layout of the Transactions View Overview Card, relocating the "Edit Account" action button into a separate border-separated footer division beneath the progress bar to resolve spacing fatigue.

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
