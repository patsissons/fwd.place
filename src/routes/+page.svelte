<script lang="ts">
  import IndexPage from 'pages/IndexPage'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<IndexPage {data} />
