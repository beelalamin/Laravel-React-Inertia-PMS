<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false;


    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'Description' => $this->desription,
            'created_at' => (new Carbon($this->created_at))->format('d-m-y'),
            'status' => $this->status,
            'due_date' => (new Carbon($this->due_date))->format('d-m-y'),
            'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
