class TrackOrders:
    def __init__(self):
        self.menu_options = set()
        self.costumer_orders = dict()
        self.all_orders = list()
        self.days_worked = set()

    def __len__(self):
        return len(self.all_orders)

    def add_new_order(self, costumer, order, day):
        self.menu_options.add(order)
        self.days_worked.add(day)

        costumer_order = (order, day)

        if costumer not in self.costumer_orders:
            self.costumer_orders[costumer] = [costumer_order]
        else:
            self.costumer_orders[costumer].append(costumer_order)

        new_order = [costumer, order, day]
        self.all_orders.append(new_order)

    def get_most_ordered_dish_per_costumer(self, costumer):
        all_costumer_orders = dict()

        for order, _ in self.costumer_orders[costumer]:
            if order in all_costumer_orders:
                all_costumer_orders[order] += 1
            else:
                all_costumer_orders[order] = 0

        return max(
            all_costumer_orders,
            key=all_costumer_orders.get
        )

    def get_never_ordered_per_costumer(self, costumer):
        costumer_orders = list()
        for order, _ in self.costumer_orders[costumer]:
            costumer_orders.append(order)

        return self.menu_options.difference(costumer_orders)

    def get_days_never_visited_per_costumer(self, costumer):
        frequency_days = set()
        for _, day in self.costumer_orders[costumer]:
            frequency_days.add(day)

        return self.days_worked.difference(frequency_days)

    def get_busiest_day(self):
        pass

    def get_least_busy_day(self):
        pass
