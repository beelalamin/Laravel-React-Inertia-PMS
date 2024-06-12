<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'Description' => $this->desription,
            'created_at' => (new Carbon($this->created_at))->format('d-m-y'),
            'status' => $this->status,
            'due_date' => (new Carbon($this->due_date))->format('d-m-y'),
            'image_path' => $this->image_path,
            'priority' => $this->priority,
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'project' => new ProjectResource($this->project),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
