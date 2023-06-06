<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $message;
    public $user;
    public function __construct($message,$user)
    {
        $this->message=$message;
        $this->user=$user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('hello'),
        ];
    }
    public function broadcastWith(){
        return [
            'status'=>1,
            'data'=>[
                'name'=>'The Thai',
                'phone'=>'0999999999',
                'branch'=>'Honda',
                'palet'=>'17A2-9999'
            ]
            
        ];
    }
    public function broadcastAs()
    {
        return 'message';
    }
}
