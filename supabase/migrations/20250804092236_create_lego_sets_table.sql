-- Migration: Create lego_sets table
-- Purpose: Create the main table for storing LEGO set collection data
-- Created: 2025-08-04
-- Author: System

-- Create custom enum for lego set types
create type lego_set_type as enum ('plants', 'vehicles', 'buildings');

-- Create the main lego_sets table with all required fields
create table lego_sets (
  id uuid default gen_random_uuid() primary key,
  set_number varchar(50) not null unique,
  name varchar(255) not null,
  piece_count integer not null check (piece_count > 0),
  age_group varchar(50) not null,
  price decimal(10,2) not null check (price > 0),
  has_built boolean default true,
  type lego_set_type not null,
  details jsonb not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for better query performance
-- Index on set_number for faster lookups when searching by set number
create index idx_lego_sets_set_number on lego_sets(set_number);

-- Index on type for filtering by lego set type
create index idx_lego_sets_type on lego_sets(type);

-- Create function to automatically update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row updates
create trigger update_lego_sets_updated_at 
  before update on lego_sets 
  for each row 
  execute function update_updated_at_column();

-- Enable Row Level Security (RLS) for the table
-- This is required even for public access tables according to Supabase best practices
alter table lego_sets enable row level security;

-- Create RLS policies for public access
-- Since this is a public collection registry, we allow all operations for all users

-- Policy for selecting (reading) lego sets
-- Allows anyone to view all lego sets in the collection
create policy "Allow public read access" on lego_sets
  for select using (true);

-- Policy for inserting (creating) new lego sets
-- Allows anyone to add new lego sets to the collection
create policy "Allow public insert access" on lego_sets
  for insert with check (true);

-- Policy for updating existing lego sets
-- Allows anyone to modify existing lego sets in the collection
create policy "Allow public update access" on lego_sets
  for update using (true);

-- Policy for deleting lego sets
-- Allows anyone to remove lego sets from the collection
create policy "Allow public delete access" on lego_sets
  for delete using (true); 