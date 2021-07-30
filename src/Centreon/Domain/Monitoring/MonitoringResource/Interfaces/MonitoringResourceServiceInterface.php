<?php

/*
 * Copyright 2005 - 2021 Centreon (https://www.centreon.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * For more information : contact@centreon.com
 *
 */
declare(strict_types=1);

namespace Centreon\Domain\Monitoring\MonitoringResource\Interfaces;

use Centreon\Domain\Contact\Interfaces\ContactInterface;
use Centreon\Domain\Monitoring\ResourceFilter;
use Centreon\Domain\Monitoring\MonitoringResource\Model\MonitoringResource;
use Centreon\Domain\Monitoring\MonitoringResource\Exception\MonitoringResourceException;
use Contact;

/**
 * @package Centreon\Domain\Monitoring\MonitoringResource\Interfaces
 */
interface MonitoringResourceServiceInterface
{
    public const TYPE_SERVICE = 'service';
    public const TYPE_HOST = 'host';

    /**
     * List of all types
     */
    public const TYPES = [
        self::TYPE_HOST,
        self::TYPE_SERVICE,
    ];

    /**
     * Non-ok status in hard state , not acknowledged & not in downtime
     */
    public const STATE_UNHANDLED_PROBLEMS = 'unhandled_problems';

    /**
     * Non-ok status in hard state
     */
    public const STATE_RESOURCES_PROBLEMS = 'resources_problems';

    /**
     * Resources in downtime
     */
    public const STATE_IN_DOWNTIME = 'in_downtime';

    /**
     * Acknowledged resources
     */
    public const STATE_ACKNOWLEDGED = 'acknowledged';

    /**
     * All status & resources
     */
    public const STATE_ALL = 'all';

    /**
     * List of all states
     */
    public const STATES = [
        self::STATE_UNHANDLED_PROBLEMS,
        self::STATE_RESOURCES_PROBLEMS,
        self::STATE_IN_DOWNTIME,
        self::STATE_ACKNOWLEDGED,
        self::STATE_ALL,
    ];

    public const STATUS_OK = 'OK';
    public const STATUS_UP = 'UP';
    public const STATUS_WARNING = 'WARNING';
    public const STATUS_DOWN = 'DOWN';
    public const STATUS_CRITICAL = 'CRITICAL';
    public const STATUS_UNREACHABLE = 'UNREACHABLE';
    public const STATUS_UNKNOWN = 'UNKNOWN';
    public const STATUS_PENDING = 'PENDING';

    /**
     * List of all types
     */
    public const STATUSES = [
        self::STATUS_OK,
        self::STATUS_UP,
        self::STATUS_WARNING,
        self::STATUS_DOWN,
        self::STATUS_CRITICAL,
        self::STATUS_UNREACHABLE,
        self::STATUS_UNKNOWN,
        self::STATUS_PENDING,
    ];
    /**
     * Find all Monitoring Resources (for non admin user).
     *
     * @param ResourceFilter $filter
     * @param ContactInterface $contact
     * @return MonitoringResource[]
     * @throws MonitoringResourceException
     */
    public function findAllWithAcl(ResourceFilter $filter, ContactInterface $contact): array;

    /**
     * Find all Monitoring Resources (for admin user).
     *
     * @param ResourceFilter $filter
     * @return MonitoringResource[]
     * @throws MonitoringResourceException
     */
    public function findAllWithoutAcl(ResourceFilter $filter): array;

    /**
     * Used to filter requests according to a contact.
     * If the filter is defined, all requests will use the ACL of the contact
     * to fetch data.
     *
     * @param mixed $contact Contact to use as a ACL filter
     * @return self
     * @throws \Exception
     */
    public function filterByContact($contact);
}