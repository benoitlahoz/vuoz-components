export const template = `` +
`<div>` +
`  <div style="width: 640px; height: 480px; border: solid 1px black; position: relative;" :class="(position.includes('top') || position.includes('bottom')) ? 'is-flex-column' : 'is-flex'">` +
`    <div v-if="position === 'right' || position === 'bottom-right' || position === 'bottom' || position === 'bottom-left'" class="flex-grow is-flex align-center justify-center has-background-medium-grey">Main content</div>` + 
`    <vuoz-toolbar :type="type" :show="show" :vertical="vertical" :size="size" :position="position" :space="space" :items="items" :color="color" :border="border" :rounded="rounded" :shadow="shadow" :disabled="disabled" @click="onClick"> ` +
`    </vuoz-toolbar>` +
`    <div v-if="position === 'left' || position === 'top-left' || position === 'top' || position === 'top-right'" class="flex-grow is-flex align-center justify-center has-background-medium-grey">Main content</div>` + 
`  </div>` +
`</div>`