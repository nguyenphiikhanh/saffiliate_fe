<template>
  <div class="w-full animate-fade-in">
    <!-- Page Title & Header -->
    <div
      class="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div>
        <h1
          class="text-[30px] font-black tracking-tight text-slate-900 dark:text-white leading-tight"
        >
          Quản Lý <span class="text-shopee-orange">Đơn Hàng</span>
        </h1>
        <p
          class="text-[14px] text-slate-500 dark:text-slate-400 mt-1 font-medium"
        >
          Xem thông tin chi tiết và tiến trình hoàn tiền của toàn bộ đơn hàng
          của bạn.
        </p>
      </div>
    </div>

    <!-- Order Process Info Component -->
    <OrderProcessInfo />

    <!-- MAIN BODY: Filters, Search & Table -->
    <div
      class="rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20 mt-8"
    >
      <!-- Filters Container -->
      <div class="flex items-center w-full">
        <!-- Status Tabs Filters -->
        <div
          class="flex items-center gap-1 bg-slate-50 dark:bg-slate-950/60 p-1 rounded-2xl border border-slate-200/40 dark:border-slate-800/50 w-full sm:w-auto"
        >
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            type="button"
            class="flex-1 sm:flex-initial px-2.5 sm:px-4 py-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap"
            :class="[
              activeTab === tab.value
                ? 'bg-shopee-orange text-white shadow-md shadow-orange-500/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ]"
          >
            <span
              v-html="tab.icon"
              class="flex items-center justify-center shrink-0"
            ></span>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Info Box for Pending Tab -->
      <div
        v-if="activeTab === 'pending'"
        class="mt-5 rounded-2xl bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100/60 dark:border-orange-500/20 p-4"
      >
        <div class="flex items-start gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-shopee-orange shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p
              class="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              <span class="font-bold text-slate-800 dark:text-slate-100"
                >Chờ hoàn:</span
              >
              đơn đã ghi nhận hoàn tiền, đang đợi sàn xác nhận hết thời gian
              hủy, đổi trả. Với Sộp-pe, hãy bấm Đã nhận hàng trong app để được
              hoàn sớm nhất.
            </p>
          </div>
        </div>
      </div>

      <!-- Info Box for Cancelled Tab -->
      <div
        v-if="activeTab === 'cancelled'"
        class="mt-5 rounded-2xl bg-rose-50/50 dark:bg-rose-500/5 border border-rose-100/60 dark:border-rose-500/20 p-4"
      >
        <div class="flex items-start gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-rose-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p
              class="text-[13px] text-slate-600 dark:text-slate-350 leading-relaxed font-semibold"
            >
              <span class="font-black text-slate-800 dark:text-slate-100"
                >Đã hủy:</span
              >
              đơn có thể do bạn hủy, hoặc cashback bị hủy từ sàn. Saffi là trung
              gian nên không được cung cấp lý do cụ thể, nhưng luôn sẵn sàng gửi
              thông tin đối soát từ sàn cho bạn để đảm bảo hệ thống minh bạch.
              Vui lòng liên hệ
              <NuxtLink
                to="/ho-tro"
                class="text-rose-500 hover:text-rose-600 font-black underline transition-all"
                >Hỗ trợ</NuxtLink
              >
              để được cung cấp thêm thông tin.
            </p>
          </div>
        </div>
      </div>

      <!-- Skeleton Loading State -->
      <div
        v-if="status === 'pending'"
        class="mt-6 overflow-x-auto bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/60"
      >
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800"
            >
              <th class="p-4 pl-6 whitespace-nowrap w-[20%]">Mã đơn</th>
              <th class="p-4 whitespace-nowrap w-[35%]">Sản phẩm</th>
              <th class="p-4 whitespace-nowrap w-[15%]">Ngày</th>
              <th class="p-4 text-right whitespace-nowrap w-[15%]">Hoa hồng</th>
              <th class="p-4 whitespace-nowrap text-center w-[10%]">
                Trạng thái
              </th>
              <th class="p-4 whitespace-nowrap text-center w-[5%]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm"
          >
            <tr v-for="i in 5" :key="i" class="animate-pulse">
              <!-- Mã đơn Skeleton -->
              <td class="p-4 pl-6">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800/80 shrink-0"
                  ></div>
                  <div
                    class="h-3 w-16 bg-slate-200 dark:bg-slate-800/80 rounded"
                  ></div>
                </div>
              </td>
              <!-- Sản phẩm Skeleton -->
              <td class="p-4">
                <div
                  class="h-3.5 w-48 max-w-full bg-slate-200 dark:bg-slate-800/80 rounded"
                ></div>
              </td>
              <!-- Ngày Skeleton -->
              <td class="p-4">
                <div
                  class="h-3 w-20 bg-slate-200 dark:bg-slate-800/80 rounded"
                ></div>
              </td>
              <!-- Tích lũy Skeleton -->
              <td class="p-4 text-right">
                <div class="flex items-center justify-end">
                  <div
                    class="h-3.5 w-16 bg-slate-200 dark:bg-slate-800/80 rounded"
                  ></div>
                </div>
              </td>
              <!-- Trạng thái Skeleton -->
              <td class="p-4 text-center">
                <div
                  class="h-5 w-20 bg-slate-200 dark:bg-slate-800/80 rounded-full mx-auto"
                ></div>
              </td>
              <!-- Hành động Skeleton -->
              <td class="p-4 text-center">
                <div
                  class="h-6.5 w-12 bg-slate-200 dark:bg-slate-800/80 rounded-lg mx-auto"
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Orders Table -->
      <div class="mt-6" v-else-if="filteredOrders.length > 0">
        <!-- Desktop Table View -->
        <div
          class="hidden md:block overflow-x-auto bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/60"
        >
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800"
              >
                <th class="p-4 pl-6 whitespace-nowrap w-[20%]">Mã đơn</th>
                <th class="p-4 whitespace-nowrap w-[35%]">Sản phẩm</th>
                <th class="p-4 whitespace-nowrap w-[15%]">Ngày</th>
                <th class="p-4 text-right whitespace-nowrap w-[15%]">
                  Hoa hồng
                </th>
                <th class="p-4 whitespace-nowrap text-center w-[10%]">
                  Trạng thái
                </th>
                <th class="p-4 whitespace-nowrap text-center w-[5%]">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm"
            >
              <tr
                v-for="order in filteredOrders"
                :key="order.code"
                class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <!-- Mã đơn -->
                <td class="p-4 pl-6">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 109.59 122.88" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 shrink-0">
                        <path fill="#EE4D2D" d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"/>
                      </svg>
                    </div>
                    <span
                      class="font-bold text-slate-700 dark:text-slate-200 text-xs"
                      >#{{ order.code }}</span
                    >
                  </div>
                </td>
                <!-- Sản phẩm -->
                <td class="p-4">
                  <div
                    class="font-bold text-slate-600 dark:text-slate-300 text-[13px] truncate max-w-[280px]"
                    :title="order.itemName || order.storeName"
                  >
                    {{
                      order.itemName || order.storeName || "Sản phẩm từ Shopee"
                    }}
                  </div>
                </td>
                <!-- Ngày -->
                <td class="p-4">
                  <div class="text-xs text-slate-500 font-medium">
                    {{ order.date }}
                  </div>
                </td>
                <!-- Hoa hồng -->
                <td class="p-4 text-right">
                  <div
                    class="flex items-center justify-end gap-1.5 font-black text-emerald-500 text-[13px]"
                  >
                    +{{ formatMoney(order.cashbackAmount) }}
                    <span
                      class="w-3.5 h-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-[8px] font-bold"
                      >đ</span
                    >
                  </div>
                </td>
                <!-- Trạng thái -->
                <td class="p-4 text-center">
                  <span
                    class="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    :class="statusStyles[order.status]"
                  >
                    {{
                      order.status === "Completed" ||
                      order.status === "Thành công"
                        ? "HOÀN THÀNH"
                        : order.status
                    }}
                  </span>
                </td>
                <!-- Hành động -->
                <td class="p-4 text-center">
                  <button
                    @click="openOrderDetails(order)"
                    class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-shopee-orange dark:hover:border-shopee-orange bg-slate-50 hover:bg-shopee-orange/5 dark:bg-slate-950/20 text-slate-600 hover:text-shopee-orange dark:text-slate-400 dark:hover:text-shopee-orange font-bold text-xs active:scale-[0.96] transition-all cursor-pointer select-none"
                    type="button"
                  >
                    Xem
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card List View -->
        <div class="block md:hidden divide-y divide-slate-100 dark:divide-slate-800/60">
          <div
            v-for="order in filteredOrders"
            :key="order.code"
            @click="openOrderDetails(order)"
            class="flex items-center justify-between py-3.5 cursor-pointer active:bg-slate-50 dark:active:bg-slate-800/40 transition-colors"
          >
            <!-- Left Side: Icon & Order Info -->
            <div class="flex items-center gap-3 min-w-0">
              <!-- Shopee Icon -->
              <div class="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 109.59 122.88" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 shrink-0">
                  <path fill="#EE4D2D" d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"/>
                </svg>
              </div>

              <!-- Order Text Info -->
              <div class="flex flex-col min-w-0">
                <span class="font-extrabold text-slate-800 dark:text-slate-200 text-[13.5px] truncate">
                  #{{ order.code }}
                </span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px] mt-0.5">
                  {{ order.itemName || order.storeName || "Sản phẩm từ Shopee" }}
                </span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                  {{ order.date }}
                </span>
              </div>
            </div>

            <!-- Right Side: Money & Status -->
            <div class="flex flex-col items-end shrink-0 pl-2">
              <span class="font-black text-shopee-orange text-[14px] leading-tight">
                +{{ formatMoney(order.cashbackAmount) }}<span class="underline ml-0.5">đ</span>
              </span>
              <div class="flex items-center gap-0.5 mt-1.5">
                <span
                  class="text-[11px] font-bold"
                  :class="[
                    order.status === 'Thành công' ? 'text-emerald-500 dark:text-emerald-400' :
                    order.status === 'Chờ duyệt' ? 'text-amber-500 dark:text-amber-400' :
                    'text-rose-500 dark:text-rose-450'
                  ]"
                >
                  {{ order.status }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-slate-450 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="py-16 flex flex-col items-center justify-center text-center"
      >
        <template v-if="activeTab === 'pending'">
          <div class="relative">
            <div
              class="h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-shopee-orange shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div
              class="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-shopee-orange flex items-center justify-center text-white border-2 border-white dark:border-slate-900 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clip-rule="evenodd"
                />
                <path
                  d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
                />
              </svg>
            </div>
          </div>
          <h3
            class="text-[17px] font-black text-slate-800 dark:text-slate-100 mt-5"
          >
            Đừng bỏ lỡ cơ hội hoàn tiền!
          </h3>
          <p
            class="text-sm text-slate-500 dark:text-slate-400 mt-2.5 max-w-[320px] font-medium leading-relaxed"
          >
            Hãy bắt đầu <b>mua sắm qua Saffi</b> để tích điểm hoàn tiền ngay cho
            đơn mua sắm của bạn.
          </p>
          <NuxtLink
            to="/hoan-tien"
            class="mt-6 inline-flex items-center gap-2 bg-shopee-orange text-white px-6 py-3 rounded-xl font-bold text-[13px] shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            MUA SẮM HOÀN TIỀN NGAY
          </NuxtLink>
        </template>

        <template v-else>
          <div
            class="h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-85 flex items-center justify-center text-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xs font-bold text-slate-700 dark:text-slate-300 mt-4">
            Không tìm thấy đơn hàng nào
          </h3>
          <p
            class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 max-w-[280px]"
          >
            Chưa có đơn hàng nào trong trạng thái này.
          </p>
        </template>
      </div>
    </div>

    <!-- User Order Details Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedOrder"
          class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
        >
          <div
            @click="closeOrderDetails"
            class="absolute inset-0 cursor-default"
          ></div>

          <div
            class="relative bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 animate-fade-in-up z-10"
          >
            <div
              class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-shopee-orange to-rose-500"
            ></div>

            <!-- Modal Header -->
            <div
              class="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-5"
            >
              <div>
                <span
                  class="inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mb-2"
                  :class="statusStyles[selectedOrder.status]"
                >
                  {{
                    selectedOrder.status === "Completed" ||
                    selectedOrder.status === "Thành công"
                      ? "HOÀN THÀNH"
                      : selectedOrder.status
                  }}
                </span>
                <h3
                  class="text-base font-black text-slate-800 dark:text-slate-100"
                >
                  Chi tiết đơn hàng
                  <span class="text-orange-500 dark:text-orange-400 select-all"
                    >#{{ selectedOrder.code }}</span
                  >
                </h3>
                <p class="text-xs text-slate-400 mt-1">
                  Cửa hàng: {{ selectedOrder.storeName || "Shopee Store" }}
                </p>
              </div>
              <button
                @click="closeOrderDetails"
                class="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="space-y-5 select-none pr-1">
              <!-- 1. Rank Discount rate Info -->
              <div
                v-if="selectedOrder.rawItem?.order?.userRank"
                class="bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between"
              >
                <div class="flex flex-col">
                  <span
                    class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest"
                    >Hạng thành viên mua đơn</span
                  >
                  <span
                    class="text-xs font-black text-slate-800 dark:text-slate-200 mt-1"
                    >Cấp bậc:
                    {{
                      getRankName(selectedOrder.rawItem.order.userRank)
                    }}</span
                  >
                </div>
                <span
                  class="px-2.5 py-1 rounded-full border text-[9px] font-extrabold tracking-wider bg-shopee-orange/5 border-shopee-orange/20 text-shopee-orange"
                >
                  Nhận {{ selectedOrder.rawItem.order.commissionRate }}% hoa
                  hồng
                </span>
              </div>

              <!-- 2. Product Details -->
              <div>
                <span
                  class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5"
                  >Thông tin sản phẩm</span
                >
                <div class="space-y-2">
                  <div
                    class="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed"
                  >
                    {{ selectedOrder.itemName || "Sản phẩm từ Shopee" }}
                  </div>
                  <div
                    class="flex items-center gap-1.5 text-[10px] text-slate-450 dark:text-slate-500"
                  >
                    <span v-if="selectedOrder.rawItem?.order?.itemId"
                      >Mã SP: {{ selectedOrder.rawItem.order.itemId }}</span
                    >
                    <span
                      v-if="selectedOrder.rawItem?.order?.l1GlobalCategory"
                      class="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full"
                    ></span>
                    <span v-if="selectedOrder.rawItem?.order?.l1GlobalCategory"
                      >Danh mục:
                      {{ selectedOrder.rawItem.order.l1GlobalCategory }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- 3. Financial Info Grid -->
              <div>
                <span
                  class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5"
                  >Chi tiết tích lũy hoàn tiền</span
                >
                <div class="grid grid-cols-2 gap-3.5">
                  <div
                    class="bg-shopee-orange/5 dark:bg-shopee-orange/10 p-4 rounded-2xl border border-shopee-orange/10 dark:border-shopee-orange/20 text-center col-span-2 shadow-sm"
                  >
                    <span
                      class="text-[9px] font-black text-shopee-orange uppercase block tracking-widest"
                      >Tiền hoàn bạn nhận được</span
                    >
                    <span
                      class="text-base font-black text-shopee-orange block mt-1.5"
                      >+{{ formatMoney(selectedOrder.cashbackAmount) }}đ</span
                    >
                  </div>
                </div>
              </div>

              <!-- 4. Date Info -->
              <div
                class="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-550 font-bold"
              >
                <span>Thời gian đặt hàng: {{ selectedOrder.date }}</span>
                <span>Trạng thái: {{ selectedOrder.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";

useSeoMeta({
  title: "Lịch sử đơn hàng - Saffi",
  ogTitle: "Lịch sử đơn hàng - Saffi",
  description:
    "Trình theo dõi và quản lý toàn bộ các đơn hàng hoàn tiền từ Shopee.",
  ogDescription:
    "Trình theo dõi và quản lý toàn bộ các đơn hàng hoàn tiền từ Shopee.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const activeTab = ref("pending");

const tabs = [
  {
    label: "Chờ duyệt",
    value: "pending",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  },
  {
    label: "Thành công",
    value: "success",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  },
  {
    label: "Đã hủy",
    value: "cancelled",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  },
];

const statusStyles = {
  "Thành công":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15",
  "Chờ duyệt":
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15",
  "Đã hủy":
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/15",
};

const statusMap = {
  pending: "Pending",
  success: "Completed",
  cancelled: "Cancelled",
};

const headers = useRequestHeaders(["cookie"]);
const queryParams = computed(() => ({
  status: statusMap[activeTab.value],
}));

const { data: response, status } = useLazyFetch("/api/order", {
  headers,
  query: queryParams,
  watch: [activeTab], // Tự động gọi lại API khi chuyển tab
});

const rawOrders = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const mapOrder = (item) => {
  const order = item.order || item;

  // Format date
  let dateStr = "N/A";
  const time = order.orderTime || order.clickTime;
  if (time) {
    const d = new Date(time);
    dateStr = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  // Normalize status cho UI hiển thị đẹp tiếng Việt
  let normStatus = "Chờ duyệt";
  const s = order.orderStatus?.toLowerCase() || "";

  if (s.includes("completed") || s.includes("Completed")) {
    normStatus = "Thành công";
  } else if (s.includes("cancelled") || s.includes("Cancelled")) {
    normStatus = "Đã hủy";
  }

  return {
    code: order.orderId || "N/A",
    storeName: order.shopName || "Shopee",
    itemName: order.itemName,
    date: dateStr,
    purchaseAmount: order.purchaseValue || 0,
    cashbackAmount: order.userCommission || 0,
    status: normStatus,
    rawItem: item,
  };
};

// Sử dụng trực tiếp orders vì Backend đã filter rồi
const filteredOrders = computed(() => rawOrders.value.map(mapOrder));

const formatMoney = (val) => {
  if (!val) return "0";
  return Math.round(Number(val)).toLocaleString("vi-VN");
};

const selectedOrder = ref(null);

const openOrderDetails = (orderItem) => {
  selectedOrder.value = orderItem;
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
};

watch(selectedOrder, (newVal) => {
  if (typeof document !== "undefined") {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});

const getRankName = (rank) => {
  if (!rank) return "BẠC";
  const r = rank.toLowerCase();
  if (r === "obsidian") return "TINH HOA";
  if (r === "gold") return "VÀNG";
  return "BẠC";
};
</script>
