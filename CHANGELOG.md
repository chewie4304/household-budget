# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.2.1] - 2026-08-20

### Refactoring & Architecture
- **Function Inventory & Reorganization:** Categorized and reordered all functions into five logical groupings (Utilities, Data/API, UI Rendering, Modals, and Event Handlers) for significantly improved maintainability [1].
- **Duplicate Code Removal:** Eliminated redundant function declarations from the script [1].
- **State Management:** Centralized and hoisted global state variables to the top of the script block [1]. Resolved a launch crash by properly declaring missing global variables (`selectedSummaryMonth`, `filteredTransactionsLookup`, etc.) before initialization [2].

### Added
- **Dynamic Autocomplete suggestions:** Overhauled the Description and Payer/Payee auto-fill dropdowns so they remain hidden until you start typing, and only query previous entries containing that specific letter combination [3, 4].
- **Split Transaction Autocomplete:** Expanded the new dynamic autocomplete logic to individual split row description fields using efficient parent event delegation [5-7].

### Fixed
- **In-Memory Balance Syncing:** Resolved an issue where toggling a transaction status between Pending ("P") and Reconciled ("R") inside the detailed account view failed to update cleared balances in the main Accounts view without a manual page refresh [8, 9].
- **Split View Payee Layout:** Fixed a layout bug where enabling split allocations on a transaction modal incorrectly hid the main Payer/Payee field [10].

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
