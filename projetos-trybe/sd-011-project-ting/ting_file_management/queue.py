class Queue:
    def __init__(self):
        self.queue = list()

    def __len__(self):
        return len(self.queue)

    def enqueue(self, value):
        self.queue.append(value)

    def dequeue(self):
        return self.queue.pop(0)

    def search(self, index):
        valid_index = index >= 0 and index < len(self.queue)
        if valid_index:
            search_result = self.queue[index]
            return search_result

        raise IndexError

    def all_queue(self):
        return self.queue
