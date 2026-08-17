# ECHO WORLDS — Game & Product Design Document

## 1. Product vision

**Fantasy:** “This is my living world. It remembers how I behave, grows while I am away, and carries my trace into other worlds.” ECHO WORLDS is a portrait, one-thumb Telegram Mini App combining social idle building, non-linear exploration and the emotional growth of a creature companion.

**Design pillars**

1. **A world that remembers.** Meaningful actions update hidden behavioral vectors; visible consequences arrive as buildings, flora, stories and eventually a civilization archetype.
2. **A living companion, not equipment.** Eiko reacts, remembers, initiates events and sometimes disagrees. Traits are never shown as raw numbers.
3. **Gentle, consequential exploration.** Expeditions mix discovery, dilemmas, preparation and occasional combat. Failure creates stories rather than deleting progress.
4. **Positive social residue.** Visits, gifts and Player Echo objects enrich other worlds. PvP is competitive but never destroys a city.
5. **Clarity before depth.** Credits, Energy, Crystals and Echo each have one immediately legible job; advanced systems unlock progressively.

**Audience and session model:** Telegram users 16–40 who enjoy cozy builders, collection and asynchronous co-op. Three 1–3 minute check-ins per day plus an optional 8–12 minute exploration session. Returning is rewarded with stories, never punished with decay.

## 2. Core gameplay loop

**Minute loop:** collect one world event → spend Energy on a building or expedition → make one expressive choice → receive Credits/items/Echo → see Eiko/world react.

**Daily loop:** “While you were away” recap → daily discovery → maintain/build settlement → launch and resolve expeditions → help or visit a friend → progress a mission.

**Weekly loop:** prepare for a world event → collaborate/compete → earn a collection piece → unlock biome/story beat → review how the civilization is changing.

**Monthly loop:** actions accumulate in five civilization affinities → day 30 produces an earned Civilization Evolution → a new visual language, passive world behavior and story branch unlock. It is a reveal, not a menu choice.

The prototype demonstrates the golden path: **WORLD → CREATURE → BUILDING → RESOURCE → EXPEDITION → EVENT → PROGRESSION → SOCIAL VISIT.**

## 3. Behavioral adaptation and creature

Every consequential action emits normalized, server-authored `behavior_signals`. Examples: carefully study ruins gives Knowledge +2, Harmony +1, curiosity +2 and intelligence +1; force entry gives Power +2 and courage +2; share loot gives Trade +1, kindness +2 and loyalty +1. Repeating the identical action has diminishing weight, preventing farming and encouraging genuine play.

Civilization axes are **Harmony, Progress, Power, Trade, Knowledge**. The system evaluates a rolling 30-day vector using 60% decisions, 25% build/investment patterns and 15% social behavior. At evolution, the two strongest compatible axes, confidence and notable memories select an archetype: Progress + Knowledge → Technocracy; Harmony + social kindness → Forest Republic; Trade + alliances → Merchant Federation; Power + courage → Warrior Empire; Knowledge + exploration → Research Civilization. Low confidence produces a hybrid “Forming Culture” and delays the reveal—players never choose the result directly.

Eiko’s hidden traits are `curiosity`, `courage`, `intelligence`, `kindness`, `greed`, `loyalty` (bounded 0–100). UI communicates them through animation, dialogue and behavior: a curious Eiko wanders toward unknown nodes; a loyal one waits by returning expeditions. One-off choices cannot transform personality: use exponential smoothing, daily caps and counter-signals. Memories reference actual event IDs (“Eiko remembers that you returned the seed”). Neglect never kills or permanently harms the companion.

## 4. Simple economy

| Resource | Purpose | Main source | Main sink | Rule |
|---|---|---|---|---|
| Credits | everyday building currency | settlement, expeditions, missions | buildings, basic crafting | plentiful; always visible |
| Energy | meaningful actions | regeneration, recap, daily discovery | building and expedition launch | 1 per 15 min, 20 cap; no overnight loss |
| Crystals | rare earned/premium currency | achievements, anomalies, Stars | cosmetics/convenience | never required for power |
| Echo | civilization evolution | discoveries, choices, social aid | milestones/technology | cannot be purchased |

MVP uses only three build costs and one expedition cost. No food/wood/stone subcurrencies: expedition materials are inventory items, not wallets. Example day-one balance: start 120 Credits/15 Energy; Home costs 60/3; expedition 5 Energy; resolution yields 80 Credits/5 Echo. The player ends richer and understands each currency in under 30 seconds.

Offline simulation is event-based, not a continuously running city. On return, server calculates completed jobs and deterministically selects at most three significant events. Resources stop at storage cap; narrative and companion affection never decay. Recap cards prioritize consequence > completion > flavor.

## 5. First 30 days

| Window | Unlocks and authored beats |
|---|---|
| Day 1 | name/generated world, meet Eiko, build Home, collect Credits, two-minute forest expedition, visible world reaction |
| Days 2–3 | Energy Garden/farm, workshop, storehouse, first NPC, second map node |
| Days 4–6 | branching expeditions, ruins, weather events, first artifact and collection page |
| Day 7 | Anomaly: three-stage choice event; first strong personality reflection |
| Days 8–10 | friend visits, help action, gifts and Player Echo seed |
| Days 11–14 | trade offers, social map, referral goal and co-op preparation |
| Day 15 | philosophy signals become narratively visible; no selection screen |
| Days 16–20 | technology, rare building, alliance joining, first cooperative PvE |
| Day 21 | global event: stabilize the Echo Storm; personal and global contribution tracks |
| Days 22–24 | territory expansion and expedition conflict matchmaking |
| Days 25–27 | alliance project, limited PvP artifact race, pre-evolution world signs |
| Days 28–29 | “Chronicle of Us” recap; final organic decisions, no quiz |
| Day 30 | Civilization Evolution reveal, share card and next-era branch |

Content is gated by active-day milestones, not calendar punishment. Missed days compress gracefully.

## 6. Expeditions (PvE)

An expedition is a server-owned state machine: `prepared → traveling → encounter → choice_pending → resolving → complete`. Loadout has one companion, one tool and up to two supplies. Encounters draw from biome, weather, world history, traits and a seeded RNG recorded server-side.

Encounter types: exploration/navigation; conversation with NPC/creature; environmental puzzle; ethical choice; resource opportunity; discovery/artifact; rare creature; and combat. Combat is a quick risk comparison with one tactical choice (approach, protect, retreat), at most 25% of encounters. Choices reveal intent, not exact trait points. A failed roll yields injury timer, partial loot or a new rescue story—never paid revival.

Example: **The Singing Root.** Study it (Knowledge/curiosity; technology fragment), protect it (Harmony/kindness; seed), extract a shard (Progress/greed; crystal chance and future forest distrust). Eiko may recommend an option based on personality. The player’s choice becomes a Chronicle entry.

## 7. Competitive PvP

No city raids, stolen owned inventory or offline destruction. **Expedition Conflicts** match comparable power bands for contested unowned resources, territory influence, artifacts or event ranking. Players commit a route and strategy asynchronously; server resolves from preparation, counters and bounded RNG. Loser keeps entry value and gets consolation progress. Seasons use soft brackets and contribution caps; cosmetics, titles and alternate artifacts are primary rewards. Direct challenges require opt-in. Anti-collusion limits repeated opponent value.

## 8. Social, alliances and Player Echo

Visits expose a curated postcard-sized world, three recent Chronicle entries and one help request. A visitor can help once daily, trade through server-escrow, gift within daily value limits, or place a Player Echo: seed, artifact, creature egg or technology fragment. Every placed object stores provenance and displays “This object came from @username’s world”; recipients control placement and can archive, but provenance remains in history.

Alliances support 5–30 members, roles (Founder, Curator, Member), chat deep-link, requests, research and shared projects. **Space Portal** has five visual stages and requires Credits, artifacts and event contributions. Contributions are append-only and capped per day; all contributors receive a commemorative portal Echo, while thresholds unlock alliance-wide narrative scenes—not exclusive power.

Safety: block/report, private-world toggle, trade confirmation, sanitized names, rate limits and no free-form text for first contact.

## 9. Telegram-native architecture and referrals

- Mini App reads Telegram theme/safe-area and sends `initData` to the backend; the backend validates HMAC and freshness before issuing a short-lived session.
- Bot menu button, direct Mini App links and `startapp` payloads route to `world/{id}`, `echo/{objectId}`, `event/{id}` or referral codes. Payloads are signed, opaque and single-purpose.
- Share cards are server-rendered Open Graph images for milestones (first spaceflight, evolution, rare discovery). The CTA deep-links into the exact scene, with a safe fallback for non-players.
- Bot notifications are explicit opt-in: expedition complete, meaningful anomaly, gift, alliance project and weekly recap. Quiet hours, category preferences, aggregation and one-tap mute are mandatory.
- Telegram Stars purchase cosmetics, world skins, seasonal passes and Echo+. Payments use invoices; only verified webhook completion grants entitlements. Refund/revocation events remove entitlements safely.

Referral reward is mutual and delayed: inviter and invitee receive a cosmetic seed plus 50 Credits only after the invitee completes the first expedition. Milestones at 3/7/15 verified friends grant profile cosmetics, never combat power. Device/account graphs, reward velocity and Telegram account age signals mitigate farms without blocking legitimate households.

## 10. Monetization

**Echo+** provides extra Chronicle bookmarks, longer recap archive, cosmetic monthly drop, additional visual loadout presets and one extra queued expedition (not faster resolution or better loot). Other sales: building facades, Eiko skins, sky/weather palettes, placement effects, profiles, seasonal cosmetic track and giftable cosmetics. Crystals can buy cosmetics and reversible convenience such as layout slots. PvP normalizes convenience; Echo, trait signals, exclusive power and guaranteed rare artifacts are never sold.

The store appears only after the golden path, has no interstitials or countdown pressure, clearly previews items and shows Stars price/refund context.

## 11. UX and screens

**Visual direction:** intimate bioluminescent solarpunk; deep evergreen base, luminous lime accents, rounded tactile panels and restrained cosmic detail. The world remains the largest object. Motion uses slow environmental breathing and quick haptic confirmation; reduced-motion is respected.

**Navigation:** persistent three destinations—World, Explore, Social. The World screen shows profile/resources, living diorama + Eiko, one recap, one next step and settlement. Explore shows biome map, current expedition and choice. Social shows Player Echo prompt and neighboring worlds. Secondary sheets: Chronicle, buildings, inventory, creature memories, alliance and store.

**First 60 seconds:** 0–8s personalized world appears; tap Eiko; 8–20s place preselected Home; 20–35s collect first resource; 35–50s launch two-minute expedition with one clear choice; 50–60s world lighting/plant changes and next goal appears. No tutorial modal: coach marks attach to the single active action, then disappear forever.

Accessibility: 44px targets, semantic labels, text alongside color, AA contrast, dynamic text allowance, haptics optional, no essential timed tapping, Russian-first strings with localization keys.

## 12. Technical architecture

**Client:** React + TypeScript Mini App as a versioned static bundle/CDN; Telegram WebApp adapter; TanStack Query in production; small local optimistic store; SVG/CSS world layers for MVP, moving to asset bundles later. Client is an untrusted renderer and never advances timers or awards currency.

**Backend:** modular monolith first (TypeScript/NestJS or Fastify), PostgreSQL, Redis for cache/rate limits/idempotency, BullMQ workers for scheduled completions, object storage/CDN for share cards, Telegram Bot webhook service. Modules: Auth, Player, World, Economy, Building, Creature, Expedition, Event, Social, Alliance, Commerce, Notification, Analytics. Split services only after measured load.

**Flow:** client action includes idempotency key → API transaction locks wallet/world aggregate → writes domain state + outbox event atomically → worker consumes outbox for simulation, notification, analytics and card generation → client refreshes through polling/reconnect (WebSocket is optional, not MVP).

### API surface (`/v1`)

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/telegram` | validate initData, issue session |
| GET | `/bootstrap` | compact player/world/resources/config payload |
| POST | `/worlds/:id/collect` | resolve eligible offline events |
| POST | `/buildings` | place/upgrade with idempotency key |
| GET/POST | `/expeditions`, `/expeditions/:id/choices` | launch/list and choose encounter |
| GET | `/chronicle` | paginated world history |
| GET | `/worlds/:id/visit` | privacy-filtered public projection |
| POST | `/worlds/:id/help`, `/player-echoes` | social actions |
| POST | `/trades`, `/trades/:id/accept` | escrow trading |
| GET/POST | `/alliances`, `/alliances/:id/contributions` | alliance/project actions |
| POST | `/payments/stars/invoice`, `/webhooks/telegram` | commerce and bot updates |
| POST | `/shares` | signed deep link + share-card job |

Errors use stable codes and server time. Cursor pagination, ETags/config versions and per-route rate limits are standard.

## 13. Database schema

PostgreSQL UUIDs, `timestamptz`, integer minor units and JSONB only for immutable authored snapshots—not core relations.

- `users(id, telegram_id UNIQUE, username, locale, timezone, created_at, last_seen_at, referred_by)`
- `worlds(id, user_id UNIQUE, name, seed, day_index, biome_state, civilization_state, version, updated_at)`
- `wallets(user_id, credits, energy, crystals, echo, energy_updated_at, version)` and `ledger_entries(id, user_id, currency, delta, reason, ref_type, ref_id, idempotency_key UNIQUE, created_at)`
- `creatures(id, world_id UNIQUE, species, skin_id, name, traits_encrypted, mood, updated_at)`
- `creature_memories(id, creature_id, event_id, kind, text_key, strength, created_at)`
- `buildings(id, world_id, definition_id, level, x, y, state, completes_at, UNIQUE(world_id,x,y))`
- `biomes(id, world_id, definition_id, status, discovered_at, exploration)`
- `expeditions(id, user_id, biome_id, state, seed, loadout, current_step, started_at, resolves_at, version)`
- `encounters(id, expedition_id, definition_version, snapshot, selected_choice, outcome, resolved_at)`
- `world_events(id, world_id, type, payload, importance, occurred_at, seen_at, claimed_at)`
- `behavior_signals(id, user_id, source_type, source_id, axis, trait, weight, occurred_at, UNIQUE(source_type,source_id,axis,trait))`
- `inventory_items(id, user_id, definition_id, quantity, provenance_world_id, locked_by_trade_id)`
- `friendships(user_id, friend_id, status, created_at)`, `visits(id, visitor_id, world_id, created_at)` and `helps(id, visitor_id, world_id, kind, day_key)`
- `player_echoes(id, source_user_id, source_world_id, target_world_id, item_id, placement, message_key, created_at, archived_at)`
- `trades(id, creator_id, recipient_id, offered_snapshot, requested_snapshot, state, expires_at)`
- `alliances(id, name, owner_id, settings, created_at)`, `alliance_members(alliance_id,user_id,role,joined_at)`
- `alliance_projects(id, alliance_id, definition_id, stage, state)` and `project_contributions(id, project_id,user_id,resource,amount,created_at)`
- `entitlements(id,user_id,sku,source,payment_id,status,expires_at)`, `payments(id, telegram_charge_id UNIQUE, user_id, sku, stars, status)`
- `notification_preferences(user_id, categories, quiet_start, quiet_end, timezone)` and `notification_jobs(id,user_id,type,payload,status,scheduled_at,dedupe_key UNIQUE)`
- `outbox_events(id, aggregate_type, aggregate_id, type, payload, created_at, processed_at)` and `analytics_events(id,user_id,session_id,name,properties,occurred_at)`.

Indexes cover completion queues `(state,resolves_at)`, unseen recap `(world_id,seen_at,importance)`, feeds and ledger lookup. Row-level ownership checks and transaction versions protect aggregates.

## 14. Notifications

Default opt-in prompt occurs only after the first expedition demonstrates value. Priority rules: gifts/anomalies immediate within local waking hours; completions grouped within 10 minutes; help activity bundled; weekly recap once. Copy contains context (“Eiko returned with something that remembers you”), never guilt (“your city is dying”). Deep links open the exact resolver. Delivery, open, mute and downstream action are measured; frequency auto-reduces when ignored.

## 15. Anti-cheat and security

- Validate Telegram `initData` signature, auth date and query canonicalization server-side; rotate sessions and bind sensitive actions to user ID.
- Authoritative clocks, RNG seeds, costs, rewards and trait calculations live server-side. Never trust client balances, completion or Telegram profile payload after auth.
- Serializable/locked wallet transactions, append-only ledger, optimistic aggregate versions and idempotency keys prevent duplication and races.
- Redis token buckets by user/IP/action; anomaly rules for impossible velocity, referrals, circular trades, alliance contribution laundering and repeated PvP pairs.
- Trade escrow and item locks prevent double spending. Signed webhook validation and unique Telegram charge IDs protect Stars grants.
- Encrypt sensitive trait/internal moderation data, minimize Telegram PII, audited admin actions, backups and deletion/export workflow.
- Deterministic expedition replay enables dispute investigation. Suspicious accounts enter reward holds/review rather than immediate irreversible bans.

## 16. Analytics

All events contain `event_version`, anonymous/user ID, session, server timestamp, active day and acquisition source. Core events: `app_opened`, `telegram_auth_completed`, `world_created`, `creature_met`, `creature_tapped`, `building_started/completed`, `resource_collected`, `expedition_started`, `encounter_viewed`, `choice_selected`, `expedition_completed`, `offline_recap_viewed/claimed`, `world_changed_viewed`, `biome_unlocked`, `chronicle_opened`, `social_opened`, `world_visited`, `help_sent`, `player_echo_placed`, `gift_sent`, `trade_completed`, `alliance_joined`, `project_contributed`, `share_created/opened`, `referral_activated/qualified`, `notification_opted_in/sent/opened/muted`, `store_viewed`, `stars_purchase_completed`, `civilization_revealed`.

Primary funnel: open → creature → Home → collect → expedition launch → expedition resolve → world change → D1 return. KPIs: golden-path completion, time-to-first-delight, D1/D7/D30 active retention, meaningful choices/week, social visit rate, recap claim rate and evolution reveal rate. Guardrails: notification mute, purchase regret/refund, PvP opt-out, crash/error and economy inflation. Use server ledger facts for economy; do not infer from button taps.

## 17. MVP: smallest lovable version

**Ship in 6–8 weeks with a small cross-functional team:** Telegram auth/profile; one seeded forest world diorama; Eiko with mood, four animations and six hidden traits; Home, Energy Garden and Workshop; four currencies with ledger/offline Energy; one biome; three expeditions containing 8–10 authored encounters and choices; event/outbox simulation; 1–3 item return recap; Chronicle; seven-day guided progression ending in Anomaly; public friend visit; one daily help; one Player Echo seed with provenance; invite deep link; two share cards; essential bot completion notification; analytics and admin content flags.

**Explicitly defer:** freeform placement, real-time chat, trading, alliances/Space Portal, PvP, global events, multiple creature species, technologies, day-30 production evolution, seasonal pass and Stars store. Preserve schema/domain seams but do not build screens or services early.

**MVP content budget:** 1 world skin, 1 creature, 3 buildings, 1 biome, 10 encounters, 20 recap lines, 8 memories, 1 anomaly, 3 share milestones. Quality bar is that day one feels authored and reactive without any social player online.

**Acceptance:** a new user completes the golden path without a tutorial page; median time under 4 minutes excluding the expedition wait; every action survives refresh and is idempotent; returning after 2+ hours shows a truthful recap; a visitor can open a shared deep link, see provenance and help; no purchase is required; crash-free sessions >99.5% in pilot.

## 18. Delivery sequence

1. Week 1: vertical slice contract, Telegram auth, bootstrap, ledger, content format and clickable UI.
2. Weeks 2–3: authoritative build/expedition state machines, worker/outbox, offline recap and creature reactions.
3. Weeks 4–5: seven-day content, Chronicle, visit projection, help/Player Echo and deep links.
4. Week 6: bot notification, share cards, analytics dashboards, security/load pass and closed pilot.
5. Weeks 7–8 contingency: tune onboarding/economy from pilot, accessibility/localization, reliability and store-readiness (without launching monetization).

The current front-end prototype intentionally focuses on the world, the first recap, a single guided expedition choice and social-visit promise. It is a testable product thesis rather than a misleading simulation of the full roadmap.
