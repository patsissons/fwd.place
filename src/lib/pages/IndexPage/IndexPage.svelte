<script lang="ts">
  import Card from 'components/Card.svelte'
  import { Content, Heading } from './components'

  export let data: unknown = undefined
</script>

<Card>
  <span slot="title">
    <Heading />
  </span>
  <Content {data} />
</Card>
