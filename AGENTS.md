<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Website architecture
- Use TanStack leaf routes for the home page and individual service pages, sharing navigation, contact, and footer components to keep the experience consistent.
- Keep service positioning in a browser-safe shared data module so detail pages present a consistent content structure.
- Until a verified contact destination is supplied, the inquiry form only downloads a local brief and explicitly states that it does not send data.
- Bundle website and product imagery as local asset imports so deployment does not depend on a hosting-specific asset pointer.
- Apply the enterprise visual system through shared global semantic tokens and shared site components so every leaf page inherits the same presentation.
- Keep Soteria's narrative browser-safe and its detailed flow diagrams in a dedicated semantic-HTML component module with shared node and connector primitives; this keeps PDF-derived flows accessible, consistently themed, and readable at small widths.
- Follow the Grafinate Brand Guidelines v1.1: Montserrat (self-hosted via `@fontsource-variable/montserrat`), navy `#022241` for text and dark surfaces, blue `#009AFD` only for graphics, rules and icons (never as text on light grounds), text-gray `#5E6772` for secondary text, light ground `#F2F4F7`. Use the supplied logo files in `src/assets/logo/` unmodified (horizontal lockup min 280px; wordmark below that; white mark only on navy), and the brand favicon set in `public/`.
