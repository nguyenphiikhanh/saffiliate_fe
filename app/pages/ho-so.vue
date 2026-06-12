<template>
  <div class="w-full animate-fade-in">
    <!-- Page Title & Header -->
    <div class="mt-6">
      <h1
        class="text-[30px] font-black tracking-tight text-slate-900 dark:text-white leading-tight"
      >
        Hồ Sơ <span class="text-shopee-orange">Cá Nhân</span>
      </h1>
      <p
        class="text-[14px] text-slate-500 dark:text-slate-400 mt-1 font-medium"
      >
        Cấu hình thông tin tài khoản cá nhân và liên kết ngân hàng đối soát mặc
        định.
      </p>
    </div>
    <!-- Dynamic Member Rank Progress Card -->
    <div
      v-if="session?.user"
      class="w-full rounded-[2rem] border border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 md:p-8 mt-6 shadow-xl shadow-slate-900/[0.01] dark:shadow-slate-950/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md"
    >
      <!-- Decorative rank-colored glow on background -->
      <div
        class="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
        :class="rankInfo.glowClass"
      ></div>

      <!-- Left + Middle: Rank Badge Icon + Progress Bar -->
      <div
        class="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full relative z-10"
      >
        <!-- Rank Icon Badge with Hover rotate -->
        <div
          class="h-16 w-16 flex items-center justify-center shrink-0 transition-transform duration-500 hover:rotate-6 select-none"
        >
          <img
            :src="rankInfo.image"
            class="h-16 w-16 object-contain drop-shadow-sm"
            :alt="rankInfo.name"
          />
        </div>

        <!-- Progress Bar Details -->
        <div class="flex-1 w-full text-center sm:text-left">
          <!-- Step indicator: Rank name to Next rank name -->
          <div
            class="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-sans font-black text-sm tracking-wide"
          >
            <span :class="rankInfo.textClass">{{ rankInfo.fullName }}</span>
            <span
              v-if="rankProgress.nextRankName !== 'ĐẠT ĐỈNH'"
              class="text-slate-300 dark:text-slate-700 font-normal"
              >&rarr;</span
            >
            <span
              v-if="rankProgress.nextRankName !== 'ĐẠT ĐỈNH'"
              class="text-shopee-orange"
              >THÀNH VIÊN {{ rankProgress.nextRankName }}</span
            >
          </div>

          <!-- The Custom Progress Bar -->
          <div
            class="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden shadow-inner relative"
          >
            <div
              class="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${rankProgress.percent}%` }"
            ></div>
          </div>

          <!-- Description -->
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-2 mt-2"
          >
            <p class="text-slate-400 dark:text-slate-550 text-[11px] font-bold">
              <span v-if="session?.user?.rank === 'obsidian'">
                Tổng đơn tích lũy:
                <span class="text-slate-700 dark:text-slate-300 font-extrabold"
                  >{{ session?.user?.completedOrdersCount ?? 0 }} đơn</span
                >
              </span>
              <span v-else>
                <span
                  class="text-slate-700 dark:text-slate-300 font-extrabold"
                  >{{ session?.user?.completedOrdersCount ?? 0 }}</span
                >
                / {{ rankProgress.nextThreshold }} đơn hàng •
              </span>
            </p>
            <p
              v-if="session?.user?.rank === 'obsidian'"
              class="text-[11px] font-extrabold text-emerald-500"
            >
              💎 Hạng Tinh Hoa tối thượng! Hãy duy trì mua sắm để bảo vệ đặc
              quyền chiết khấu cao nhất nhé.
            </p>
            <p
              v-else-if="(session?.user?.ordersToNextRank ?? 0) > 0"
              class="text-[11px] font-bold text-slate-400 dark:text-slate-500"
            >
              Hoàn thành
              <span class="text-shopee-orange font-black">{{
                session.user.ordersToNextRank
              }}</span>
              đơn nữa để thăng hạng
            </p>
            <p v-else class="text-[11px] font-extrabold text-emerald-500">
              Đã đạt cấp bậc tối đa 🎉
            </p>
          </div>
        </div>
      </div>

      <!-- Vertical Divider for Desktop -->
      <div
        class="hidden md:block h-12 w-px bg-slate-200 dark:bg-slate-800 shrink-0"
      ></div>

      <!-- Right Side: Commission Rates representation -->
      <div class="flex items-center gap-6 relative z-10 shrink-0 select-none">
        <div class="text-center">
          <span
            class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block"
            >Chiết khấu ngày thường</span
          >
          <span
            class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 block"
          >
            {{ rankProgress.normalRate }}%
          </span>
        </div>
        <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
        <div class="text-center">
          <span
            class="text-[9px] font-extrabold text-shopee-orange uppercase tracking-widest block"
            >Chiết khấu ngày đôi / KM</span
          >
          <span class="text-2xl font-black text-rose-500 mt-1 block">
            {{ rankProgress.promoRate }}%
          </span>
        </div>
      </div>
    </div>

    <!-- MAIN GRID layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start">
      <!-- COLUMN Left: Profile Summary Avatar (Span 4) -->
      <div
        class="md:col-span-4 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20 text-center flex flex-col items-center"
      >
        <!-- Avatar Photo Container -->
        <div
          class="h-24 w-24 rounded-full overflow-hidden flex items-center justify-center border-4 border-slate-100 dark:border-slate-800 shadow-md relative group select-none"
        >
          <img
            v-if="userAvatar"
            :src="userAvatar"
            class="h-full w-full object-cover"
            referrerpolicy="no-referrer"
          />
          <div
            v-else
            class="h-full w-full bg-[#EC407A] text-white font-black text-3xl flex items-center justify-center uppercase"
          >
            {{ firstLetter }}
          </div>
        </div>

        <h3
          class="text-sm font-black text-slate-800 dark:text-slate-100 mt-4 truncate max-w-full leading-tight"
        >
          {{ userName }}
        </h3>
        <p
          class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate max-w-full font-bold select-all"
        >
          {{ userEmail }}
        </p>

        <!-- Account Metrics -->
        <div
          class="w-full mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-center gap-2.5 select-none"
        >
          <span
            class="text-[9.5px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
            >Ngày tham gia:</span
          >
          <span class="text-xs font-black text-slate-700 dark:text-slate-200">{{
            joinDate
          }}</span>
        </div>
      </div>

      <!-- COLUMN Right: Settings Forms (Span 8) -->
      <div class="md:col-span-8 flex flex-col gap-6">
        <!-- Section 1: User Settings Form -->
        <div
          class="rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20"
        >
          <div
            class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60"
          >
            <h3
              class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none"
            >
              Thông Tin Tài Khoản
            </h3>

            <!-- Toggle Edit Button -->
            <button
              type="button"
              @click="handleEditProfileToggle"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-extrabold tracking-wider transition-all select-none cursor-pointer"
              :class="[
                isEditingProfile
                  ? 'text-slate-500 border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  : 'text-shopee-orange border-shopee-orange/20 bg-shopee-orange/5 hover:bg-shopee-orange/10',
              ]"
            >
              <svg
                v-if="!isEditingProfile"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{{ isEditingProfile ? "HỦY BỎ" : "CHỈNH SỬA" }}</span>
            </button>
          </div>

          <form @submit.prevent="saveProfile" class="mt-6 flex flex-col gap-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase"
                  >Họ tên</label
                >
                <input
                  :disabled="!isEditingProfile || isUpdatingProfile"
                  v-model="profileName"
                  type="text"
                  required
                  maxlength="35"
                  class="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase"
                  >Địa chỉ email</label
                >
                <input
                  :value="userEmail"
                  type="email"
                  disabled
                  class="w-full rounded-2xl border border-slate-200/40 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/20 px-4 py-3 text-xs text-slate-400 dark:text-slate-550 cursor-not-allowed select-none font-semibold"
                />
              </div>
            </div>

            <!-- Profile updated alerts -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
            >
              <div
                v-if="profileMsg || profileError"
                class="p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2"
                :class="[
                  profileError
                    ? 'bg-rose-500/10 border border-rose-500/15 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400',
                ]"
              >
                <svg
                  v-if="profileError"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4.5 w-4.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4.5 w-4.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ profileError || profileMsg }}</span>
              </div>
            </transition>

            <!-- Submit Button (Trượt hiển thị mượt mà khi bấm Chỉnh sửa) -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-2 opacity-0"
            >
              <button
                v-if="isEditingProfile"
                type="submit"
                :disabled="isLoading || isUpdatingProfile || isProfileUnchanged"
                class="self-start px-6 bg-shopee-orange text-white hover:bg-shopee-orange/95 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl py-3 font-bold text-xs shadow-md shadow-orange-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none flex items-center gap-2"
              >
                <svg
                  v-if="isUpdatingProfile"
                  class="animate-spin h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{
                  isUpdatingProfile ? "Đang lưu..." : "Lưu thay đổi"
                }}</span>
              </button>
            </transition>
          </form>
        </div>

        <!-- Section 2: Default bank linkage -->
        <div
          class="rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20"
        >
          <div
            class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60"
          >
            <h3
              class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none"
            >
              Ngân Hàng Liên Kết Đối Soát
            </h3>

            <!-- Toggle Edit Button -->
            <button
              type="button"
              @click="handleEditToggle"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-extrabold tracking-wider transition-all select-none cursor-pointer"
              :class="[
                isEditingBank
                  ? 'text-slate-500 border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  : 'text-shopee-orange border-shopee-orange/20 bg-shopee-orange/5 hover:bg-shopee-orange/10',
              ]"
            >
              <svg
                v-if="!isEditingBank"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{{ isEditingBank ? "HỦY BỎ" : "CHỈNH SỬA" }}</span>
            </button>
          </div>

          <form @submit.prevent="saveBank" class="mt-6 flex flex-col gap-5">
            <!-- Ngân hàng liên kết (Rộng toàn bộ trên cả mobile và desktop) -->
            <div class="flex flex-col gap-2 relative">
              <label
                class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase"
                >Ngân hàng liên kết</label
              >

              <!-- Custom Searchable Dropdown Trigger Button -->
              <div class="relative">
                <button
                  type="button"
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  @click="toggleDropdown"
                  class="w-full flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-3.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange transition-all disabled:opacity-50 text-left select-none"
                  :class="[
                    isEditingBank && !isBankLoading && !isUpdatingBank
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed',
                  ]"
                >
                  <div
                    v-if="selectedBankDetails"
                    class="flex items-center gap-2 min-w-0"
                  >
                    <span
                      class="font-extrabold text-[10px] text-shopee-orange bg-shopee-orange/5 px-2 py-0.5 rounded-lg border border-shopee-orange/10 shrink-0"
                    >
                      {{
                        selectedBankDetails.shortName ||
                        selectedBankDetails.short_name ||
                        selectedBankDetails.code
                      }}
                    </span>
                    <span
                      class="truncate text-slate-700 dark:text-slate-300"
                      :title="selectedBankDetails.name"
                    >
                      {{ selectedBankDetails.name }}
                    </span>
                  </div>
                  <span v-else class="text-slate-400">Chọn ngân hàng...</span>

                  <!-- Chevron icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0"
                    :class="{ 'rotate-180': isDropdownOpen }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- Invisible Fullscreen Backdrop to close dropdown on click outside -->
                <div
                  v-if="isDropdownOpen"
                  @click="isDropdownOpen = false"
                  class="fixed inset-0 z-40 cursor-default"
                ></div>

                <!-- Dropdown Popover Menu -->
                <transition
                  enter-active-class="transition duration-150 ease-out"
                  enter-from-class="transform scale-95 opacity-0 -translate-y-2"
                  enter-to-class="transform scale-100 opacity-100 translate-y-0"
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="transform scale-100 opacity-100 translate-y-0"
                  leave-to-class="transform scale-95 opacity-0 -translate-y-2"
                >
                  <div
                    v-if="isDropdownOpen"
                    class="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/40 p-3 max-h-[300px] flex flex-col gap-2 overflow-hidden animate-fade-in"
                  >
                    <!-- Search Input inside dropdown popover -->
                    <div class="relative shrink-0">
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Tìm theo tên, viết tắt hoặc mã BIN..."
                        class="w-full rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 pl-9 pr-4 py-2.5 text-[11px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange transition-all"
                      />
                      <div
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    <!-- Scrollable Options List -->
                    <div
                      class="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 select-none"
                    >
                      <div
                        v-for="bank in filteredBanks"
                        :key="bank.bin"
                        @click="selectBank(bank.bin)"
                        class="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 group"
                        :class="{
                          'bg-orange-500/[0.03] dark:bg-orange-500/[0.05]':
                            linkedBank === bank.bin,
                        }"
                      >
                        <div class="flex items-center gap-2.5 min-w-0">
                          <!-- Short Abbreviation Badge -->
                          <span
                            class="font-black text-[10px] tracking-tight px-1.5 py-0.5 rounded border transition-colors shrink-0"
                            :class="[
                              linkedBank === bank.bin
                                ? 'text-shopee-orange border-shopee-orange/20 bg-shopee-orange/[0.03]'
                                : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 group-hover:border-slate-300 dark:group-hover:border-slate-700',
                            ]"
                          >
                            {{ bank.shortName || bank.short_name || bank.code }}
                          </span>
                          <div class="min-w-0">
                            <p
                              class="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate"
                            >
                              {{ bank.name }}
                            </p>
                            <span
                              class="text-[8.5px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 block uppercase tracking-wide select-all"
                              >BIN: {{ bank.bin }}</span
                            >
                          </div>
                        </div>

                        <!-- Checkmark icon -->
                        <div
                          v-if="linkedBank === bank.bin"
                          class="shrink-0 text-shopee-orange"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2.5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>

                      <!-- Empty filtered result state -->
                      <div
                        v-if="filteredBanks.length === 0"
                        class="py-6 text-center text-slate-400 dark:text-slate-550 text-[10px] font-bold"
                      >
                        Không tìm thấy ngân hàng nào khớp
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Hàng dưới: Số tài khoản & Tên chủ tài khoản (Mobile: xếp chồng, Desktop: song song) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase sm:h-8 flex items-end pb-1"
                  >Số tài khoản</label
                >
                <input
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  v-model="bankAccount"
                  type="text"
                  required
                  placeholder="Nhập số tài khoản ngân hàng..."
                  class="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase sm:h-8 flex items-end pb-1"
                  >Chủ tài Khoản</label
                >
                <input
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  v-model="bankOwner"
                  type="text"
                  required
                  placeholder="Ví dụ: NGUYEN VAN A"
                  maxlength="35"
                  class="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange transition-all uppercase font-black disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <!-- Bank link alerts -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
            >
              <div
                v-if="bankMsg"
                class="p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2"
                :class="[
                  isBankError
                    ? 'bg-rose-500/10 border border-rose-500/15 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400',
                ]"
              >
                <svg
                  v-if="isBankError"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4.5 w-4.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4.5 w-4.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ bankMsg }}</span>
              </div>
            </transition>

            <!-- Submit Button (Trượt hiển thị mượt mà khi bấm Chỉnh sửa) -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-2 opacity-0"
            >
              <button
                v-if="isEditingBank"
                type="submit"
                :disabled="isLoading || isBankLoading || isUpdatingBank"
                class="self-start px-6 bg-shopee-orange text-white hover:bg-shopee-orange/95 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl py-3 font-bold text-xs shadow-md shadow-orange-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none flex items-center gap-2"
              >
                <svg
                  v-if="isUpdatingBank"
                  class="animate-spin h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{
                  isBankLoading
                    ? "Đang tải..."
                    : isUpdatingBank
                    ? "Đang liên kết..."
                    : "Liên kết tài khoản"
                }}</span>
              </button>
            </transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePromiseTracker } from "@/composables/usePromiseTracker";

const { isLoading } = usePromiseTracker();

useSeoMeta({
  title: "Hồ sơ cá nhân - Saffi",
  ogTitle: "Hồ sơ cá nhân - Saffi",
  description: "Trang cấu hình và bảo mật tài khoản thành viên Saffi.",
  ogDescription: "Trang cấu hình và bảo mật tài khoản thành viên Saffi.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { user } = useAuth();
const session = computed(() => (user.value ? { user: user.value } : null));
const api = useAppFetch().api;
const config = useRuntimeConfig();

const userName = computed(() => session.value?.user?.name || "User");
const userAvatar = computed(() => session.value?.user?.image || "");
const userEmail = computed(
  () => session.value?.user?.email || "mailunlockcuakhanh2@gmail.com"
);

const rankInfo = computed(() => {
  const rank = session.value?.user?.rank || "silver";
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "THÀNH VIÊN TINH HOA",
      image: "/saffi_obsidian.png",
      badgeClass:
        "bg-slate-900/10 dark:bg-slate-100/10 border-slate-900/20 text-slate-800 dark:text-slate-200",
      borderClass: "border-slate-200/60 dark:border-slate-800/80",
      glowClass: "bg-slate-500",
      textClass: "text-slate-700 dark:text-slate-300",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "THÀNH VIÊN VÀNG",
      image: "/saffi_gold.png",
      badgeClass:
        "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-500/20 dark:border-amber-500/20",
      glowClass: "bg-amber-500",
      textClass: "text-amber-500",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "THÀNH VIÊN BẠC",
      image: "/saffi_silver.png",
      badgeClass:
        "bg-slate-300/10 dark:bg-slate-300/15 border-slate-300/20 text-slate-600 dark:text-slate-400",
      borderClass: "border-slate-200 dark:border-slate-800",
      glowClass: "bg-slate-400",
      textClass: "text-slate-400",
    };
  }
});

const rankProgress = computed(() => {
  const count = session.value?.user?.completedOrdersCount ?? 0;
  const rank = session.value?.user?.rank || "silver";

  let nextRankName = "";
  let nextThreshold = 0;
  let percent = 0;
  let normalRate = 60;
  let promoRate = 70;

  if (rank === "obsidian") {
    nextRankName = "ĐẠT ĐỈNH";
    nextThreshold = 50;
    percent = 100;
    normalRate = 80;
    promoRate = 90;
  } else if (rank === "gold") {
    nextRankName = "TINH HOA";
    nextThreshold = 50;
    percent = Math.min(Math.round((count / 50) * 100), 100);
    normalRate = 70;
    promoRate = 80;
  } else {
    nextRankName = "VÀNG";
    nextThreshold = 10;
    percent = Math.min(Math.round((count / 10) * 100), 100);
    normalRate = 60;
    promoRate = 70;
  }

  return {
    nextRankName,
    nextThreshold,
    percent,
    normalRate,
    promoRate,
  };
});

const firstLetter = computed(() => {
  const name = userName.value;
  return name ? name.charAt(0).toUpperCase() : "U";
});

// Settings Input States
const profileName = ref(userName.value);
const profilePhone = ref("0968123456");
const isEditingProfile = ref(false);
const isUpdatingProfile = ref(false);
const profileMsg = ref("");
const profileError = ref("");

const originalProfileName = ref("");

const joinDate = computed(() => {
  const dateVal = session.value?.user?.createdAt;
  if (!dateVal) return "N/A";
  const dateObj = new Date(dateVal);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
});

const handleEditProfileToggle = () => {
  if (isEditingProfile.value) {
    // Rollback changes
    profileName.value = originalProfileName.value;
    isEditingProfile.value = false;
    profileError.value = "";
    profileMsg.value = "";
  } else {
    // Backup current state
    originalProfileName.value = profileName.value;
    isEditingProfile.value = true;
    profileError.value = "";
    profileMsg.value = "";
  }
};

const isProfileUnchanged = computed(
  () => profileName.value.trim() === (userName.value || "").trim()
);

const linkedBank = ref("970422"); // MB Bank BIN as default
const bankAccount = ref("");
const bankOwner = ref("");
const isEditingBank = ref(false);
const isUpdatingBank = ref(false);
const bankMsg = ref("");
const isBankError = ref(false);

// Backup state for edit rollback
const originalBankId = ref("");
const originalBankAccount = ref("");
const originalBankOwner = ref("");

const handleEditToggle = () => {
  if (isEditingBank.value) {
    // Rollback changes
    linkedBank.value = originalBankId.value;
    bankAccount.value = originalBankAccount.value;
    bankOwner.value = originalBankOwner.value;
    isEditingBank.value = false;
  } else {
    // Backup current state
    originalBankId.value = linkedBank.value;
    originalBankAccount.value = bankAccount.value;
    originalBankOwner.value = bankOwner.value;
    isEditingBank.value = true;
  }
};

const banks = ref([]);
const isBankLoading = ref(true);

const fallbackBanks = [
  {
    bin: "970422",
    code: "MB",
    shortName: "MBBank",
    name: "Ngân hàng TMCP Quân Đội",
  },
  {
    bin: "970436",
    code: "VCB",
    shortName: "Vietcombank",
    name: "Ngân hàng TMCP Ngoại Thương Việt Nam",
  },
  {
    bin: "970407",
    code: "TCB",
    shortName: "Techcombank",
    name: "Ngân hàng TMCP Kỹ Thương Việt Nam",
  },
  {
    bin: "970416",
    code: "ACB",
    shortName: "ACB",
    name: "Ngân hàng TMCP Á Châu",
  },
  {
    bin: "970418",
    code: "BIDV",
    shortName: "BIDV",
    name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
  },
];

const fetchBanksList = async () => {
  try {
    const vietQRApiUrl = config.public.vietQRApi || "https://api.vietqr.io/v2";
    const res = await $fetch(`${vietQRApiUrl}/banks`);
    if (res && res.code === "00" && Array.isArray(res.data)) {
      banks.value = res.data;
    }
  } catch (err) {
    console.error("Lỗi khi tải danh sách ngân hàng VietQR:", err);
  }
};

const fetchUserBankAccount = async () => {
  if (!session.value?.user?.id) return;
  isBankLoading.value = true;
  try {
    const res = await api.get(`/bank-account/${session.value.user.id}`);
    if (res.data) {
      linkedBank.value = res.data.bank_id;
      bankAccount.value = res.data.account_no;
      bankOwner.value = res.data.account_name;
    }
  } catch (err) {
    console.error("Lỗi khi lấy thông tin tài khoản ngân hàng:", err);
    // Keep defaults
    linkedBank.value = "970422";
    bankAccount.value = "";
    bankOwner.value = "";
  } finally {
    isBankLoading.value = false;
  }
};

const isDropdownOpen = ref(false);
const searchQuery = ref("");

const toggleDropdown = () => {
  if (!isEditingBank.value || isBankLoading.value || isUpdatingBank.value)
    return;
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    searchQuery.value = "";
  }
};

const selectBank = (bin) => {
  linkedBank.value = bin;
  isDropdownOpen.value = false;
};

const filteredBanks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const list = banks.value.length > 0 ? banks.value : fallbackBanks;
  if (!query) return list;
  return list.filter((bank) => {
    const code = (bank.code || "").toLowerCase();
    const shortName = (bank.shortName || bank.short_name || "").toLowerCase();
    const name = (bank.name || "").toLowerCase();
    const bin = (bank.bin || "").toLowerCase();
    return (
      code.includes(query) ||
      shortName.includes(query) ||
      name.includes(query) ||
      bin.includes(query)
    );
  });
});

const selectedBankDetails = computed(() => {
  const list = banks.value.length > 0 ? banks.value : fallbackBanks;
  return list.find((b) => b.bin === linkedBank.value) || null;
});

onMounted(async () => {
  await fetchBanksList();
  await fetchUserBankAccount();
});

const saveProfile = async () => {
  isUpdatingProfile.value = true;
  profileMsg.value = "";
  profileError.value = "";

  const trimmedName = profileName.value.trim();
  if (!trimmedName) {
    profileError.value = "Họ và tên không được để trống!";
    isUpdatingProfile.value = false;
    return;
  }

  if (trimmedName.length > 35) {
    profileError.value = "Họ và tên không được vượt quá 35 ký tự!";
    isUpdatingProfile.value = false;
    return;
  }

  try {
    await api.put("/user/update", {
      name: trimmedName,
    });

    profileMsg.value = "Cập nhật họ và tên thành công!";
    // Reactively sync the session state on client side
    if (user.value) {
      user.value.name = trimmedName;
    }
    isEditingProfile.value = false; // Close editing mode on successful save!
    setTimeout(() => {
      profileMsg.value = "";
    }, 4000);
  } catch (err) {
    console.error("Lỗi khi cập nhật tên người dùng:", err);
    profileError.value = err.message || "Có lỗi xảy ra khi kết nối máy chủ!";

    // Roll back changes on failed save
    profileName.value = originalProfileName.value;
    isEditingProfile.value = false;
  } finally {
    isUpdatingProfile.value = false;
  }
};

const saveBank = async () => {
  if (!session.value?.user?.id) return;
  bankMsg.value = "";
  isBankError.value = false;

  const trimmedOwner = bankOwner.value.trim();
  if (!trimmedOwner) {
    isBankError.value = true;
    bankMsg.value = "Vui lòng nhập tên chủ tài khoản!";
    return;
  }

  if (trimmedOwner.length > 35) {
    isBankError.value = true;
    bankMsg.value = "Tên chủ tài khoản không được vượt quá 35 ký tự!";
    return;
  }

  // Regex strictly enforces A-Z, a-z and spaces without accents
  const noAccentsRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  if (!noAccentsRegex.test(trimmedOwner)) {
    isBankError.value = true;
    bankMsg.value =
      "Tên chủ tài khoản phải viết không dấu (chỉ gồm chữ cái và khoảng trắng)!";
    return;
  }

  isUpdatingBank.value = true;

  const activeBanksList = banks.value.length > 0 ? banks.value : fallbackBanks;
  const selectedBankObj = activeBanksList.find(
    (b) => b.bin === linkedBank.value
  );
  const bankNameVal = selectedBankObj
    ? selectedBankObj.shortName ||
      selectedBankObj.short_name ||
      selectedBankObj.code
    : "Ngân hàng";

  try {
    await api.put(`/bank-account/${session.value.user.id}`, {
      bank_id: linkedBank.value,
      bank_name: bankNameVal,
      account_no: bankAccount.value.trim(),
      account_name: trimmedOwner.toUpperCase(),
    });

    bankMsg.value =
      "Đã liên kết tài khoản ngân hàng đối soát mặc định thành công!";
    isBankError.value = false;
    isEditingBank.value = false;
    setTimeout(() => {
      bankMsg.value = "";
    }, 4000);
  } catch (err) {
    console.error("Lỗi khi cập nhật tài khoản ngân hàng:", err);
    bankMsg.value = "Có lỗi xảy ra: " + (err.message || "Không thể lưu!");
    isBankError.value = true;

    // Roll back changes on failed save
    linkedBank.value = originalBankId.value;
    bankAccount.value = originalBankAccount.value;
    bankOwner.value = originalBankOwner.value;
    isEditingBank.value = false;
  } finally {
    isUpdatingBank.value = false;
  }
};
</script>
