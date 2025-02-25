<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar chat -->
    <div class="w-1/4 bg-white border-r border-gray-200">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold">Chats</h2>
      </div>
      <div class="p-4">
        <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div class="ml-3">
            <p class="font-medium">John Doe</p>
            <p class="text-sm text-gray-500">Hello, how are you?</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Chat Header -->
      <div class="p-4 border-b border-gray-200 bg-blue-500">
        <h2 class="text-xl font-semibold text-slate-50">John Doe</h2>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 p-4 overflow-y-auto">
        <div class="flex flex-col space-y-4">
          <!-- chat dari orang lain -->
          <div class="flex items-start">
            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div class="ml-3 bg-gray-200 p-3 rounded-lg max-w-[70%]">
              <p>Hello, how are you?</p>
            </div>
          </div>

          <!-- chat dari saya -->
          <div v-for="(msg, index) in inputValue" :key="index" class="mt-4">
            <div class="flex items-start justify-end">
              <div class="bg-blue-500 text-white p-3 rounded-lg max-w-[70%]">
                <p>{{ msg }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center">
          <input
            v-model="message"
            type="text"
            placeholder="Type a message..."
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatApp',
  data() {
    return {
      message: '',
      inputValue: [],
    }
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.inputValue.push(this.message)
        this.message = ''
      }
    },
  },
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
