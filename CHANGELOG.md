# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

## [1.4.2-dev] - 2026-08-24

### Added
- **Mobile Numeric Keypad Enforcement:** Embedded the `inputmode="decimal"` attribute across all financial inputs to force mobile browsers (iOS and Android) to automatically launch a clean, decimal-ready numeric keypad on tap, minimizing mobile input friction.

### Changed
- **Amount Input Keypads Optimized:** Upgraded the main transaction amount input (`txAmount`), split transaction row amounts (`data-split-amount`), cleared balance adjustment fields (`clearedBalanceInput`), and account creation parameters—including Initial Balance (`accBalance`), Credit Limit (`accCreditLimit`), Minimum Alert (`accMinBalance`), and Maximum Alert (`accMaxBalance`)—to trigger the decimal keypad while perfectly preserving your custom in-app mathematical formula evaluation engine on field blur.

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
