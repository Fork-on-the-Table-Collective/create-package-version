# create-package-version

GitHub Action that returns a package name based on either:
- the current tag name (for tag refs), or
- a timestamp + branch name (for branch refs).

## Inputs

- `github_ref` (required)
  - Example values:
    - `refs/tags/v1.2.3`
    - `refs/heads/main`

## Outputs

- `packageName`
  - If `github_ref` starts with `refs/tags/`, output is the tag name only.
  - Otherwise output format is:
    - `YYYY_M_D_H_m_s_branchName`

## Usage

```yaml
name: Example
on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  package-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Create package version
        id: version
        uses: Fork-on-the-Table-Collective/create-package-version@main
        with:
          github_ref: ${{ github.ref }}

      - name: Show output
        run: echo "packageName=${{ steps.version.outputs.packageName }}"
```

## Development

This project is implemented in TypeScript.

### Install

```bash
npm install
```

### Type check

```bash
npm run typecheck
```

### Build

Builds the action bundle to `dist/index.js` using `@vercel/ncc`.

```bash
npm run build
```

## Notes

- `node_modules/` is git-ignored and should not be committed.
- The action entry point is `dist/index.js` (configured in `action.yml`).
